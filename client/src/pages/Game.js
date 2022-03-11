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



const Game = () => {
  
  return (
    <main>
      <Flex align="center" justify="center">
        <Container as={Stack} justify={"center"} align={"center"}>
          <Grid
            padding="2"
            bg="yellow.100"
            borderRightRadius="xl"
            borderLeftRadius="xl"
          >
            <GridItem
              padding="4"
              bg="gray.100"
              borderRightRadius="md"
              borderLeftRadius="md"
            >
              <Center>
                <Text fontSize="md">Player's Cards</Text>
              </Center>
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
            >
              <Center>
                <Text fontSize="xl">Computer's Cards</Text>
              </Center>
            </GridItem>
          </Grid>
        </Container>
      </Flex>
    </main>
  );
};

export default Game;
