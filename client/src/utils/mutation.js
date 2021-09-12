import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String!], $bookId: String!, $title: String!, $description: String, $image: String!, $link: String) {
    saveBook(authors: $authors, bookId: $bookId, title: $title, description: $description, image: $image, link: $link) {
      _id
      username
      email
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook( $bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks{
        _id
        authors
        bookId
        title
        description
        image
      }
    }
  }
`;





