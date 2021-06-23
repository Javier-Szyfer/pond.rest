import { useAuth } from "../lib/auth";

import useSWR from "swr";
import fetcher from "../utils/fetcher";
import NextLink from "next/link";

import {
  Text,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

export default function Submissions() {
  const { user } = useAuth();

  const { data: submissions } = useSWR("api/getSubmissions", fetcher);
  if (user) {
    return (
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Table variant="simple" mt="3rem">
          <Thead>
            <Tr>
              <Th>Link</Th>
              <Th>Email</Th>
              <Th>Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {submissions?.submissions.map((sub) => (
              <Tr key={sub.id}>
                <Td cursor="pointer">
                  <a href={sub.url} target="_blank" rel="noopener noreferrer">
                    {sub.url}
                  </a>
                </Td>
                <Td>
                  <a href={`mailto:${sub.email}`} target="_blank">
                    {sub.email}
                  </a>
                </Td>

                <Td>
                  <Text isTruncated maxW="200px">
                    {sub.message}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    );
  } else {
    return (
      <Container
        maxW="container.xl"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading> Sorry, your not supposed to be here</Heading>
      </Container>
    );
  }
}
