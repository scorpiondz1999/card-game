import React from "react";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Center,
  Box,
} from "@chakra-ui/react";

import img from "../assets/img/home.jpg";

const GameHome = () => {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={500}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Welcome to{" "}
          <Text as={"span"} color={"orange.400"}>
            GO FISH GAME
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
        Go Fish or Fish is a card game usually played by two to five players, although it can be played with up to 10 players. It can be played in about 5 to 15 minutes.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            <a href="/game">Start Game</a>
          </Button>
          <Button rounded={"full"} px={6}>
            <a href="/instructions">See Instructions</a>
          </Button>
        </Stack>
        <Flex w={"full"}>
          <Box>
            <Center>
              <Image boxSize="1000" height="600" objectFit="cover" src={img} />
            </Center>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export default GameHome;
