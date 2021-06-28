import Link from "next/link";

import {
  Container,
  Box,
  Text,
  Input,
  FormLabel,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { interviews } from "../interviews/content";

export default function Notes() {
  return (
    <Container maxW="md">
      {interviews.map((int) => (
        <Box
          key={int.slug}
          borderTop="1px solid #b3b3b3"
          m="1rem 0"
          p="1rem"
          cursor="pointer"
        >
          <Link href={int.slug}>
            <Heading as="h1" color="#b3b3b3">
              {int.artist}
            </Heading>
          </Link>
        </Box>
      ))}
    </Container>
  );
}
