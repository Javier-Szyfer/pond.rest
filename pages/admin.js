import { useState } from "react";
import { useAuth } from "../lib/auth";
import NextLink from "next/link";

import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Progress,
  Heading,
  Flex,
} from "@chakra-ui/react";
export default function Admin() {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      await auth.signinWithEmail(email, password);
    } catch (err) {
      setError("You are not an admin");
      setLoading(false);
    }
  };

  return (
    <Container
      maxW="container.sm"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {!auth.user ? (
        <form
          onSubmit={handleLogIn}
          style={{ width: "100%", margin: "0", padding: "0" }}
        >
          <Box
            minH="500px"
            bg="#f7f7f7"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #549543"
            borderRadius="0.375rem"
            p="2rem"
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value), setError("");
              }}
              mb="2rem"
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value), setError("");
              }}
              mb="2rem"
            />

            <Button size="lg" variant="solid" type="submit" mb="2rem">
              <Text color="#535353">Log in</Text>
            </Button>

            <Text color="red">{error}</Text>
            {loading && <Progress size="xs" isIndeterminate m="1rem 0" />}
          </Box>
        </form>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading mb="2rem">You are in Javier</Heading>
          <Flex>
            <NextLink href="/adminDashboard">
              <Button mr="1rem">Go to dashboard</Button>
            </NextLink>
            <NextLink href="/submissions">
              <Button>Go to submissions</Button>
            </NextLink>
          </Flex>
          <Button mt="2rem" variant="outline" onClick={() => auth.signout()}>
            Log out
          </Button>
        </Box>
      )}
    </Container>
  );
}
