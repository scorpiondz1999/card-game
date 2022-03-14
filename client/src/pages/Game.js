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
import React, { useState, useEffect, useRef } from "react";
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
  deck = [],
  myInterval = null;

const Game = () => {
  const [stateGame, setStateGame] = useState("init");
  const [remainingDeck, setRemainingDeck] = useState(0);
  const [scorePlayer, setScorePlayer] = useState(0);
  const [scoreComputer, setScoreComputer] = useState(0);
  const [setsNumber, setSetsNumber] = useState(0);
  const [fishingFor, setFishingFor] = useState("");
  const [fishingFrom, setFishingFrom] = useState("");
  const [dateStart, setDateStart] = useState(0);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(true);
  const [turn, setTurn] = useState(true); // Player Turn => turn = true; Computer Turn => turn = false
  const [messageGame, setMessageGame] = useState("");

  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });

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
    getTime(Date.now());
    gameBegin();
  };

  const replayGame = () => {
    setStateGame("play");
    playerCards = [];
    computerCards = [];
    setRemainingDeck(0);
    setFishingFor("");
    setFishingFrom("");
    setMessageGame("Game replayed !");
    startGame();
  };

  const stopGame = () => {
    setStart(false);
    setStop(true);
    setStateGame("init");
    playerCards = [];
    computerCards = [];
    setScorePlayer(0);
    setScoreComputer(0);
    setRemainingDeck(0);
    setSetsNumber(0);
    setFishingFor("");
    setFishingFrom("");
    setMessageGame("Game stopped !");
    getTime(0);
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
      let newCard = deck[0];
      deck = deck.slice(1);
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
      if (deck.length === 0) {
        alert("Game ended !");
        stopGame();
        setMessageGame("Game Over !");
      }
    }
    checkPairs();
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

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v.value === val ? a + 1 : a), 0);

  //checks for pairs in both hands and removes them
  function checkPairs() {
    let tab = playerCards;
    tab.map((e) => {
      const count = countOccurrences(tab, e.value);
      if (count === 4 || count === 2) {
        playerCards = playerCards.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.value === value.value)
        );
      }
    });

    tab = computerCards;
    tab.map((e) => {
      const count = countOccurrences(tab, e.value);
      if (count === 4 || count === 2) {
        computerCards = computerCards.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.value === value.value)
        );
      }
    });
  }

  //determines if the game is finished
  function checkWin(myturn) {
    if (playerCards.length === 0) {
      setStateGame("playerwin");
      alert("Congrats, you won!");
      setScorePlayer(scorePlayer + 1);
      setSetsNumber(setsNumber + 1);
      replayGame();
      return true;
    } else if (computerCards.length === 0) {
      setStateGame("computerwin");
      alert("Game over, Computer wins");
      setScoreComputer(scoreComputer + 1);
      setSetsNumber(setsNumber + 1);
      replayGame();
      return true;
    } else {
      setTurn(!myturn);
      return false;
    }
  }

  function getTime(time) {
    if (time === 0) {
      clearInterval(myInterval);
    } else {
      const dateStartGame = Date.now();
      myInterval = setInterval(() => {
        const millis = Date.now() - dateStartGame;
        setDateStart(`${Math.floor(millis / 1000)}`);
      }, 1000);
    }
  }

  /*if (!loggedIn) {
    return window.location.assign("/login");
  }*/

  return (
    <main>
      <Flex align="center" justify="center">
        <Grid
          padding="2"
          bg="yellow.100"
          borderRightRadius="xl"
          borderLeftRadius="xl"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(1, 1fr)"
        >
          <GridItem
            padding="4"
            bg="gray.100"
            borderRightRadius="md"
            borderLeftRadius="md"
            width={{
              md: 620,
              lg: 840,
              xl: 1065,
            }}
            height={height + 60}
          >
            <Center>
              <Text fontSize="xl">Player's Cards</Text>
            </Center>
            <Box display="flex" alignItems="center" ref={ref}>
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
                          <TagLabel style={{ marginTop: 5 }}>{t.suit}</TagLabel>
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
                              pickCard(card, true);
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
                            colorScheme={t.type_card === "red" ? "red" : "blue"}
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
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Grid
              h="230px"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(5, 1fr)"
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
                  Score Player : {scorePlayer}
                </Text>
                <Divider />
                <Text fontSize={{ md: "sm", lg: "sm", xl: "md" }}>
                  Score Computer : {scoreComputer}
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
                <Text fontSize="md" marginTop={3}>
                  Seconds elapsed : {dateStart}
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
              md: 640,
              lg: 840,
              xl: 1065,
            }}
            height={height + 60}
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
                          <TagLabel style={{ marginTop: 5 }}>{t.suit}</TagLabel>
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
                            colorScheme={t.type_card === "red" ? "red" : "blue"}
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
      </Flex>
    </main>
  );
};

export default Game;
