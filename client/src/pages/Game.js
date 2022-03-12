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
} from "@chakra-ui/react";
import React, { useState } from "react";
import defaultCard from "../assets/default-card.png";
import Auth from "../utils/auth";

const tabCardDefault = [
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
  "dafaultCard",
];

const Game = () => {
  const [stateGame, setStateGame] = useState("init");
  const [numberCards, setNumberCards] = useState(7);
  const [remainingDeck, setRemainingDeck] = useState(0);
  const [scorePlayer, setScorePlayer] = useState(0);
  const [scoreComputer, setScoreComputer] = useState(0);
  const [setsNumber, setSetsNumber] = useState(0);
  const [fishingFor, setFishingFor] = useState(0);
  const [fishingFrom, setFishingFrom] = useState(0);
  const [huntedPlayer, setHuntedPlayer] = useState(0);
  const [huntedComputer, setHuntedComputer] = useState(0);
  const [deckPlayer, setDeckPlayer] = useState([]);
  const [deckComputer, setDeckComputer] = useState([]);

  const loggedIn = Auth.loggedIn();

  const startGame = () => {
    alert("game started");
  };

  const replayGame = () => {};

  const stopGame = () => {};

  const quitGame = () => {};

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
            gap={numberCards + 1}
          >
            <GridItem
              padding="4"
              bg="gray.100"
              borderRightRadius="md"
              borderLeftRadius="md"
              width={{
                md: 90 * numberCards,
                lg: 120 * numberCards,
                xl: 150 * numberCards,
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
                  : deckPlayer.map((t) => {
                      return (
                        <Image
                          boxSize={{ md: 110, lg: 100, xl: 150 }}
                          src={t}
                        ></Image>
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
                    {fishingFor}
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
                    {fishingFrom}
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
                  <Text fontSize="md" marginBottom={3}>
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
                      onClick={() => startGame()}
                      style={{ cursor: "progress" }}
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
                    >
                      Start
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => replayGame()}
                    >
                      Replay
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => stopGame()}
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
                md: 90 * numberCards,
                lg: 120 * numberCards,
                xl: 150 * numberCards,
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
                  : deckComputer.map((t) => {
                      return (
                        <Image
                          boxSize={{ md: 110, lg: 120, xl: 150 }}
                          src={t}
                        ></Image>
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
