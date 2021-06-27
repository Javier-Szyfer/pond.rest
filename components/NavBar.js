import NextLink from "next/link";

import {
  Heading,
  Container,
  Box,
  Flex,
  Spacer,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import SubmitForm from "./SubmitForm";
export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const sizeMe = useBreakpointValue({ base: ".9rem", md: "1rem" });

  return (
    <Box
      position="sticky"
      top="0px"
      zIndex="999"
      bg="rgba(10 ,10,10,0.7)"
      style={{ backdropFilter: "blur(4px)" }}
      maxH="14vh"
      pt={{ base: 2, sm: 3 }}
      pb={{ base: 2, sm: 3 }}
    >
      <Container maxW="container.xl">
        <Flex w="full" alignItems="center" justifyContent="center">
          <NextLink href="/" passHref>
            <Heading cursor="pointer" as="h1" fontSize={sizeMe} color="#909090">
              Pond
            </Heading>
          </NextLink>
          <Spacer />
          <Heading
            cursor="pointer"
            as="h1"
            fontSize={sizeMe}
            color="#909090"
            onClick={onOpen}
            mr="2rem"
          >
            Get Featured
          </Heading>
          <NextLink href="/notes" passHref>
            <Heading cursor="pointer" as="h1" fontSize={sizeMe} color="#909090">
              Notes
            </Heading>
          </NextLink>
        </Flex>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size={isMobile ? "xs" : "md"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading fontSize="1rem">Get featured on Pond </Heading>
            </ModalHeader>
            <ModalCloseButton _focus={{ borderColor: "none" }} />
            <ModalBody>
              <SubmitForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
