import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  {
    player {
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
