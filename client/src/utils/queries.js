import { gql } from '@apollo/client';
export const QUERY_USER = gql`
  query {
    me {
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
