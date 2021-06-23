import NextLink from "next/link";

import {
  Heading,
  Container,
  Box,
  Flex,
  Spacer,
  useBreakpointValue,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";

import SubmitForm from "./SubmitForm";
export default function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const sizeMe = useBreakpointValue({ base: "1rem", md: "1rem" });

  return (
    <Box
      position="sticky"
      top="0px"
      zIndex="999"
      // bg="hsla(0,0%,100%,.825)"
      style={{ backdropFilter: "blur(4px)" }}
      maxH="12vh"
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
            Submit your work{" "}
          </Heading>
          <NextLink href="/blog" passHref>
            <Heading cursor="pointer" as="h1" fontSize={sizeMe} color="#909090">
              Blog
            </Heading>
          </NextLink>
          <Box onClick={toggleColorMode} ml="2rem" cursor="pointer">
            {colorMode === "light" ? (
              <FiMoon color="rgb(133, 133, 133)" />
            ) : (
              <FiSun color="rgb(133, 133, 133)" />
            )}
          </Box>
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
