import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  {
   cards {
      p1Cards(
        suit: String
        type_card: String
        value: String
        type_player: String
      )
      compCards(
        suit: String
        type_card: String
        value: String
        type_player: String
      )
      deck(suit: String, type_card: String, value: String, type_player: String)
    }
  }
`;

export const GET_GAMES = gql`
  query GetPosts {
    getgames {
      idSession
      username
      scorePlayer
      scoreComputer
      setsNumber
      timeGame
    }
  }
`;
