import Link from "next/link";

import { Button, Container, Heading } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <Container
      maxW="container.xl"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Heading as="h1" color="#b3b3b3" size="md" fontWeight="normal">
        404 - <span style={{ fontWeight: "light" }}> Page not fund </span>
      </Heading>
      <Link href="/">
        <a>
          <Button variant="ghost" mt="1rem" color="#b3b3b3">
            Back
          </Button>
        </a>
      </Link>
    </Container>
  );
}
