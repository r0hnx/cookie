import apollo from "apollo-server";
const { gql } = apollo;

export default gql`
type Website {
    id: ID!
    website: String!
    createdAt: String!
    username: String!
    password: String!
    iv: String!
    tag: String!
    tags: [String]!
    user: ID!
}

type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
}

input Register {
    email: String!
    password: String!
    username: String!
    confirmPassword: String!
}

type Query {
    getWebsites: [Website]
    getWebsite(id: String!): Website!
    getPassword(id: String!, tag: String!, password: String!) : String
    hashPassword: String!
    encPass:String!
}

type Mutation {
    register(_register: Register): User!
    login(identifier: String!, password: String!): User!
    createWebsite(username: String!, password: String!, website: String!, tags: [String!]): Website!
    updateWebsite(username: String, password: String, website: String, tags: [String]): Website!
    deleteWebsite(id: String!): String!,
}
`;