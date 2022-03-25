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
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_GAMES } from "../utils/queries";

const Score = (props) => {
  const { loading, error, data } = useQuery(GET_GAMES);
  if (loading) return <div>Loading...</div>;
  if (error) return console.log(`Error! ${error.message}`);

  const result = data.getgames;

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
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
    </Flex>
  );
};

export default Score;
