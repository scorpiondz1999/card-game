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

  type Suits {
    suit: String
    type_card: String
  }

  type Values {
    value: String
  }

  type Player {
    suit: String
    type_card: String
    value: String
    type_player: String
  }

  type Computer {
    suit: String
    type_card: String
    value: String
    type_player: String
  }

  type Deck {
    suit: String
    type_card: String
    value: String
    type_player: String
  }

  type Cards {
    p1Cards: Player
    compCards: Computer
    deck: Deck
  }

  type Score {
    idSession: String
  }
  type Query {
    me(_id: ID): User
  }

  type getDeck {
    session: String
    deck: [Deck]
    player: [Player]
    computer: [Computer]
  }

  type Mutation {
    deck(deck: String): getDeck
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    savegame(
      idSession: String!
      username: String!
      scorePlayer: String!
      scoreComputer: String!
      setsNumber: String!
      timeGame: String!
    ): Score
    removeCards(type_player: String!): Cards
  }
`;

module.exports = typeDefs;
