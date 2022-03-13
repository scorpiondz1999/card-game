const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(_id: ID): User
  }

  type Suits {
    suit: String
    type_card: String
  }

  type Values {
    value: String
  }

  type Cards {
    suit: String
    value: String
    type_player: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    saveCards(suit: String!, value: String!, type_player: String!): Cards
    removeCards(type_player: String!): Cards
  }
`;

module.exports = typeDefs;
