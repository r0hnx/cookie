import { gql } from "@apollo/client";

export const GET_WEBSITES = gql`
  query GetWebsites {
    getWebsites {
      id
      website
      createdAt
      username
      tags
      password
      tag
    }
  }
`;

export const GET_PASSWORD = gql`
  query GetPassword($id: String!, $password: String!, $tag: String!) {
    getPassword(id: $id, password: $password, tag: $tag)
  }
`;
