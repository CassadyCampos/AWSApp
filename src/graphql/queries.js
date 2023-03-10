/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBookReview = /* GraphQL */ `
  query GetBookReview($id: ID!) {
    getBookReview(id: $id) {
      id
      title
      reviewNotes
      image
      reviewScore
      createdAt
      updatedAt
    }
  }
`;
export const listBookReviews = /* GraphQL */ `
  query ListBookReviews(
    $filter: ModelBookReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        reviewNotes
        image
        reviewScore
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
