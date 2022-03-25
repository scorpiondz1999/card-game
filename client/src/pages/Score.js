import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_GAMES } from "../utils/queries";
import Auth from "../utils/auth";

import decode from "jwt-decode";

const Score = (props) => {
  const [filter, setFilter] = useState(false);

  const { loading, error, data } = useQuery(GET_GAMES);

  if (loading) return <div>Loading...</div>;
  if (error) return console.log(`Error! ${error.message}`);

  let result = data.getgames;

  const loggedIn = Auth.loggedIn();

  if (loggedIn && filter) {
    const token = Auth.getToken();
    const user = decode(token);
    console.log(user);
    console.log(result);
    result = result.filter((e) => e.username === user.data.username);
  } else {
    result = data.getgames;
  }

  return (
    <div>
      <Flex minH={"15vh"} align={"center"} justify={"center"}>
        <RadioGroup defaultValue="1">
          <Stack spacing={5} direction="row">
            <Radio
              colorScheme="red"
              value="1"
              onChange={(e) => {
                if (e.target.value == "1") setFilter(false);
              }}
            >
              Show all
            </Radio>
            <Radio
              colorScheme="green"
              value="2"
              onChange={(e) => {
                if (e.target.value == "2") setFilter(true);
              }}
              isDisabled={!loggedIn ? true : false}
            >
              Only my results
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <div>
          <Table variant="simple" style={{ width: "70%" }}>
            <TableCaption>Table scores of all games</TableCaption>
            <Thead>
              <Tr>
                <Th>Session</Th>
                <Th>Player</Th>
                <Th>Player Score</Th>
                <Th>Computer Score</Th>
                <Th>Game Time</Th>
                <Th>Sets Number</Th>
                <Th>Winner</Th>
              </Tr>
            </Thead>
            <Tbody>
              {result.map((game) => {
                return (
                  <Tr>
                    <Td>{game.idSession}</Td>
                    <Td>{game.username}</Td>
                    <Td>{game.scorePlayer}</Td>
                    <Td>{game.scoreComputer}</Td>
                    <Td>{game.timeGame} seconds</Td>
                    <Td>{game.setsNumber}</Td>
                    <Td>
                      {game.scorePlayer > game.scoreComputer
                        ? game.username
                        : game.scorePlayer < game.scoreComputer
                        ? "Computer"
                        : "/"}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
      </Flex>
    </div>
  );
};

export default Score;
