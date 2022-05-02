import { gql } from "@apollo/client";

// Define mutation
export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      id
      email
      token
      username
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      _register: {
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      token
      username
    }
  }
`;

export const CREATE = gql`
  mutation Create(
    $username: String!
    $password: String!
    $website: String!
    $tags: [String!]
  ) {
    createWebsite(
      username: $username
      password: $password
      website: $website
      tags: $tags
    ) {
      website
    }
  }
`;

export const DELETE = gql`
  mutation Delete($id: String!) {
    deleteWebsite(id: $id)
  }
`;
