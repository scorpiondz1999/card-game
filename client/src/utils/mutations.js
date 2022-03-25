import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATEGAME_MUTATION = gql`
  mutation creategame($data: String) {
    deck(deck: $data) {
      session
      deck {
        suit
        type_card
        value
        type_player
      }
      player {
        suit
        type_card
        value
        type_player
      }
      computer {
        suit
        type_card
        value
        type_player
      }
    }
  }
`;

export const CREATECARDSPLAYERS_MUTATION = gql`
  mutation cardsplayers($data: String) {
    player(typePlayer: $data) {
      type
      player {
        suit
        type_card
        value
        type_player
      }
    }
  }
`;

export const SAVEGAME_MUTATION = gql`
  mutation saveGame(
    $idSession: String!
    $username: String!
    $scorePlayer: String!
    $scoreComputer: String!
    $setsNumber: String!
    $timeGame: String!
  ) {
    savegame(
      idSession: $idSession
      username: $username
      scorePlayer: $scorePlayer
      scoreComputer: $scoreComputer
      setsNumber: $setsNumber
      timeGame: $timeGame
    ) {
      idSession
    }
  }
`;

export const GETGAMES_MUTATION = gql`
  mutation saveGame(
    $idSession: String!
    $username: String!
    $scorePlayer: String!
    $scoreComputer: String!
    $setsNumber: String!
    $timeGame: String!
  ) {
    savegame(
      idSession: $idSession
      username: $username
      scorePlayer: $scorePlayer
      scoreComputer: $scoreComputer
      setsNumber: $setsNumber
      timeGame: $timeGame
    ) {
      idSession
    }
  }
`;
   