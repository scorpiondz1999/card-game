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
  const [deckPlayer, setDeckPlayer] = useState([]);
  const [deckComputer, setDeckComputer] = useState([]);

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
