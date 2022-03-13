import {
  Box,
  Container,
  Text,
  Center,
  Flex,
  Image,
  Stack,
  Grid,
  GridItem,
  Button,
  Divider,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import defaultCard from "../assets/default-card.png";
import gameCard from "../assets/white-card.png";
import Auth from "../utils/auth";
import { startNewGame } from "../utils/API";
import { STARTGAME_MUTATION } from "../utils/mutations";

const tabCardDefault = [
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
];

let playerCards = [],
  computerCards = [],
  deck = [];

const Game = () => {
  const [stateGame, setStateGame] = useState("init");
  const [numberCardsPlayer, setNumberCardsPlayer] = useState(7);
  const [numberCardsComputer, setNumberCardsComputer] = useState(7);
  const [remainingDeck, setRemainingDeck] = useState(0);
  const [scorePlayer, setScorePlayer] = useState(0);
  const [scoreComputer, setScoreComputer] = useState(0);
  const [setsNumber, setSetsNumber] = useState(0);
  const [fishingFor, setFishingFor] = useState(0);
  const [fishingFrom, setFishingFrom] = useState(0);
  const [huntedPlayer, setHuntedPlayer] = useState(0);
  const [huntedComputer, setHuntedComputer] = useState(0);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(true);
  const [turn, setTurn] = useState(true); // Player Turn => turn = true; Computer Turn => turn = false
  const [messageGame, setMessageGame] = useState("");

  const loggedIn = Auth.loggedIn();

  const token = Auth.getToken();

  const takeTurn = () => {
    setTurn(true);
    setMessageGame("Player's Turn");
  };

  const startGame = async () => {
    setStart(true);
    setStop(false);
    const result = await startNewGame(token);
    playerCards = result.player;
    computerCards = result.computer;
    deck = result.deck;
    setRemainingDeck(result.deck.length);
    setStateGame("play");
    gameBegin();
  };

  const replayGame = () => {
    setStart(true);
  };

  const stopGame = () => {
    setStart(false);
    setStop(true);
  };

  const quitGame = () => {
    setStart(false);
    setStop(true);
    window.location.assign("/");
  };

  const gameBegin = () => {
    //player with more cards left goes first
    let bool = false;
    if (playerCards.length >= computerCards.length) {
      bool = true;
      setTurn(true);
    } else {
      setTurn(false);
    }
    if (bool) {
      console.log("Player go!");
      setMessageGame("Player GO!");
    } else {
      console.log("Computer go!");
      setMessageGame("Computer Go!");
      pickCard(null, bool);
    }
  };

  function pickCard(selectedCard, myturn) {
    let match = false;
    if (myturn) {
      //checks the computer hand for a card to make a pair
      for (let i = 0; i < computerCards.length; i++) {
        if (selectedCard.value === computerCards[i].value) {
          match = true;
          let tab = [];
          playerCards.map((e) => {
            if (
              e.suit !== selectedCard.suit ||
              e.value !== selectedCard.value
            ) {
              tab.push(e);
            }
          });
          playerCards = tab;
          tab = [];
          computerCards.map((e) => {
            if (
              e.suit !== selectedCard.suit ||
              e.value !== selectedCard.value
            ) {
              tab.push(e);
            }
          });
          computerCards = tab;
          break;
        }
      }
      isMatch(match, myturn);
    } else {
      let randomSelection =
        computerCards[Math.floor(Math.random() * computerCards.length)];
      setFishingFrom(randomSelection);
      for (let i = 0; i < playerCards.length; i++) {
        if (randomSelection.value === playerCards[i].value) {
          match = true;

          let tab = [];
          computerCards.map((e) => {
            if (
              e.suit !== randomSelection.suit ||
              e.value !== randomSelection.value
            ) {
              tab.push(e);
            }
          });
          computerCards = tab;
          tab = [];
          playerCards.map((e) => {
            if (
              e.suit !== randomSelection.suit ||
              e.value !== randomSelection.value
            ) {
              tab.push(e);
            }
          });
          playerCards = tab;
          break;
        } else {
          match = false;
        }
      }
      isMatch(match);
    }
  }

  const isMatch = (match, myturn) => {
    if (!match) {
      let newCard = deck.pop();
      if (myturn) {
        const tab = playerCards;
        tab.push({
          suit: newCard.Suit.suit,
          type_card: newCard.Suit.type_card,
          value: newCard.Value.value,
          type_player: "player",
        });
        playerCards = tab;
      } else {
        const tab = computerCards;
        tab.push({
          suit: newCard.Suit.suit,
          type_card: newCard.Suit.type_card,
          value: newCard.Value.value,
          type_player: "computer",
        });
        computerCards = tab;
      }
      setRemainingDeck(deck.length);
    }
    //redraw card hands
    if (myturn) {
      if (!checkWin(myturn)) {
        setTurn(false);
        setMessageGame("Computer's Turn");
        pickCard(null, false);
      }
    } else {
      if (!checkWin(myturn)) {
        setTurn(true);
        setMessageGame("Player's Turn");
      }
    }
  };

  //determines if the game is finished
  function checkWin(myturn) {
    console.log(playerCards.length);
    console.log(computerCards.length);
    if (playerCards.length === 0) {
      setStateGame("playerwin");
      alert("Congrats, you won!");
      setScorePlayer(scorePlayer + 1);
      startGame();
      return true;
    } else if (computerCards.length === 0) {
      setStateGame("computerwin");
      alert("Game over, Computer wins");
      setScoreComputer(scoreComputer + 1);
      startGame();
      return true;
    } else {
      setTurn(!myturn);
      return false;
    }
  }

  if (!loggedIn) {
    return window.location.assign("/login");
  }

  return (
    <main>
      <Flex align="center" justify="center">
        <Container as={Stack} justify={"center"} align={"center"}>
          <Grid
            padding="2"
            bg="yellow.100"
            borderRightRadius="xl"
            borderLeftRadius="xl"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(1, 1fr)"
          >
            <GridItem
              padding="4"
              bg="gray.100"
              borderRightRadius="md"
              borderLeftRadius="md"
              width={{
                md: 90 * numberCardsPlayer,
                lg: 120 * numberCardsPlayer,
                xl: 150 * numberCardsPlayer,
              }}
            >
              <Center>
                <Text fontSize="md">Player's Cards</Text>
              </Center>
              <Box display="flex" alignItems="center">
                {stateGame === "init"
                  ? tabCardDefault.map((t) => {
                      return (
                        <Image
                          boxSize={{ md: 110, lg: 120, xl: 150 }}
                          src={defaultCard}
                        ></Image>
                      );
                    })
                  : playerCards.map((t) => {
                      return (
                        <div>
                          <Tag
                            size="sm"
                            key="sm"
                            variant="outline"
                            colorScheme={t.type_card === "red" ? "red" : "blue"}
                            style={{
                              position: "relative",
                              top: 28,
                              left: 5,
                            }}
                          >
                            <TagLabel style={{ marginTop: 5 }}>
                              {t.suit}
                            </TagLabel>
                          </Tag>
                          <div
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              if (turn) {
                                const card = {
                                  suit: t.suit,
                                  type_card: t.type_card,
                                  type_player: "player",
                                  value: t.value,
                                };
                                setFishingFor(card);
                                pickCard(card, turn);
                              }
                            }}
                          >
                            <Image
                              boxSize={{ md: 110, lg: 120, xl: 150 }}
                              src={gameCard}
                            ></Image>
                            <Tag
                              size="xl"
                              key="xl"
                              variant="outline"
                              colorScheme={
                                t.type_card === "red" ? "red" : "blue"
                              }
                              style={{
                                position: "relative",
                                top: -85,
                                padding: 15,
                              }}
                            >
                              <TagLabel style={{ marginTop: 5 }}>
                                {t.value}
                              </TagLabel>
                            </Tag>
                          </div>
                        </div>
                      );
                    })}
              </Box>
            </GridItem>
            <GridItem
              padding="4"
              bg="green.100"
              borderRightRadius="md"
              borderLeftRadius="md"
            >
              <Grid
                h="200px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
              >
                <GridItem
                  rowSpan={2}
                  colSpan={1}
                  bg="gold"
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent={"space-between"}
                  padding="5"
                >
                  <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                    Remainnig Deck : {remainingDeck}
                  </Text>
                  <Divider />
                  <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                    Player Score : {scorePlayer}
                  </Text>
                  <Divider />
                  <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                    Computer Score : {scoreComputer}
                  </Text>
                  <Divider />
                  <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                    Sets : {setsNumber}
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={1}
                  bg="papayawhip"
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent={"space-between"}
                  padding="5"
                >
                  <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                    Fishing For :
                  </Text>
                  <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                    {fishingFor.value} {fishingFor.suit}
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={1}
                  bg="papayawhip"
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent={"space-between"}
                  padding="5"
                >
                  <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                    Fishing From :
                  </Text>
                  <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                    {fishingFrom.value} {fishingFrom.suit}
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={2}
                  bg="papayawhip"
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent={"space-between"}
                  padding="5"
                >
                  <Text fontSize="md" marginBottom={2} color="blueviolet">
                    {stateGame === "init"
                      ? "Clic on Start to Begin a new game"
                      : messageGame}
                  </Text>
                  <Divider />
                  <Text fontSize="md" marginBottom={2} marginTop={3}>
                    Hunted {huntedPlayer} from Player
                  </Text>
                  <Divider />
                  <Text fontSize="md" marginTop={3}>
                    Hunted {huntedComputer} from Computer
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={1}
                  bg="green.200"
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent={"space-between"}
                  alignSelf={"center"}
                  padding={5}
                >
                  <Stack direction="row" spacing={10} align="center">
                    <Button
                      colorScheme="orange"
                      variant="solid"
                      onClick={() => takeTurn()}
                      style={{ cursor: "progress" }}
                      disabled={start === false || stop === true ? true : false}
                    >
                      Take Turn
                    </Button>
                  </Stack>
                </GridItem>
                <GridItem
                  colSpan={3}
                  bg="green.200"
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent={"space-between"}
                  alignSelf={"center"}
                  padding={5}
                >
                  <Stack
                    direction="row"
                    spacing={{ md: 5, lg: 10, xl: 20 }}
                    align="center"
                  >
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => startGame()}
                      style={{ cursor: "progress" }}
                      disabled={start === true ? true : false}
                    >
                      Start
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => replayGame()}
                      disabled={start === false ? true : false}
                    >
                      Replay
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => stopGame()}
                      disabled={start === false ? true : false}
                    >
                      Stop
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      onClick={() => quitGame()}
                    >
                      Quit
                    </Button>
                  </Stack>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem
              padding="4"
              bg="blue.100"
              borderRightRadius="md"
              borderLeftRadius="md"
              width={{
                md: 90 * numberCardsComputer,
                lg: 120 * numberCardsComputer,
                xl: 150 * numberCardsComputer,
              }}
            >
              <Center>
                <Text fontSize="xl">Computer's Cards</Text>
              </Center>
              <Box display="flex" alignItems="center">
                {stateGame === "init"
                  ? tabCardDefault.map((t) => {
                      return (
                        <Image
                          boxSize={{ md: 110, lg: 120, xl: 150 }}
                          src={defaultCard}
                        ></Image>
                      );
                    })
                  : computerCards.map((t) => {
                      return (
                        <div>
                          <Tag
                            size="sm"
                            key="sm"
                            variant="outline"
                            colorScheme={t.type_card === "red" ? "red" : "blue"}
                            style={{
                              position: "relative",
                              top: 28,
                              left: 5,
                            }}
                          >
                            <TagLabel style={{ marginTop: 5 }}>
                              {t.suit}
                            </TagLabel>
                          </Tag>
                          <div style={{ textAlign: "center" }}>
                            <Image
                              boxSize={{ md: 110, lg: 120, xl: 150 }}
                              src={gameCard}
                            ></Image>
                            <Tag
                              size="xl"
                              key="xl"
                              variant="outline"
                              colorScheme={
                                t.type_card === "red" ? "red" : "blue"
                              }
                              style={{
                                position: "relative",
                                top: -80,
                                padding: 15,
                              }}
                            >
                              <TagLabel style={{ marginTop: 5 }}>
                                {t.value}
                              </TagLabel>
                            </Tag>
                          </div>
                        </div>
                      );
                    })}
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Flex>
    </main>
  );
};

export default Game;
