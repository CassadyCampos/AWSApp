import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listBookReviews } from "./graphql/queries";
import {
  createBookReview as createReviewMutation,
  deleteBookReview as deleteReviewMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [bookReviews, setBookReviews] = useState([]);

  useEffect(() => {
    fetchBookReviews();
  }, []);

  async function fetchBookReviews() {
    const apiData = await API.graphql({ query: listBookReviews });
    const reviewsFromAPI = apiData.data.listBookReviews.items;

    // Async grab all the image url's from Storage
    await Promise.all(
      reviewsFromAPI.map(async (bookReview) => {
        if (bookReview.image) {
          const url = await Storage.get(bookReview.name);
          bookReview.image = url;
        }
        return bookReview;
      })
    )

    setBookReviews(reviewsFromAPI);
  }

  async function createReview(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      title: form.get("title"),
      reviewNotes: form.get("reviewNotes"),
      image: image.name,
      reviewScore: 5,
    };

    if (!!data.image) {
      await Storage.put(data.name, image);
    }
    await API.graphql({
      query: createReviewMutation,
      variables: { input: data },
    });
    fetchBookReviews();
    event.target.reset();
  }

  async function deleteReview({ id, name }) {
    const newBookReviews = bookReviews.filter((bookReview) => bookReview.id !== id);
    setBookReviews(newBookReviews);
    await Storage.remove(name);
    await API.graphql({
      query: deleteReviewMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Reading List</Heading>
      <View as="form" margin="3rem 0" onSubmit={createReview}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="title"
            placeholder="Book Title"
            label="Book Title"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="reviewNotes"
            placeholder="Review Notes"
            label="Review Notes"
            labelHidden
            variation="quiet"
            required
          />
          <View
          name="image"
          as="input"
          type="file"
          style={{ alignSelf: "end", height: "40px"
          }}/>
          <Button type="submit" variation="primary">
            Create Book Review!
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Library</Heading>
      <View margin="3rem 0">
        {bookReviews.map((bookReview) => (
          <Flex
            key={bookReview.id || bookReview.title}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {bookReview.title}
            </Text>
            <Text as="span">{bookReview.reviewNotes}</Text>
            {bookReview.image && (
              <Image
              src={bookReview.image}
              alt={`visual aid for ${bookReviews.title}`}
              style={{ width: 400 }}
              />
            )}
            <Button variation="link" onClick={() => deleteReview(bookReview)}>
              Delete
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);