import NextLink from "next/link";
import { useRouter } from "next/router";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
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
import { MdControlPoint } from "react-icons/md";

export default function Navigation() {
  const router = useRouter();
  const { pathname } = router;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const sizeMe = useBreakpointValue({ base: ".9rem", md: "1rem" });

  if (!isMobile) {
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
              <Heading
                cursor="pointer"
                as="h1"
                fontSize={sizeMe}
                color="#b3b3b3"
              >
                {pathname === "/notes" ? "Pond" : ""}
              </Heading>
            </NextLink>
            <Spacer />
            <Heading
              cursor="pointer"
              as="h2"
              fontSize={sizeMe}
              color="#b3b3b3"
              onClick={onOpen}
              mr={{ base: "1rem", md: "2rem" }}
              _hover={{ color: "#c8c8c8" }}
            >
              Get Featured
            </Heading>
            <NextLink href="/notes" passHref>
              <Heading
                cursor="pointer"
                as="h1"
                fontSize={sizeMe}
                color="#b3b3b3"
                mr={{ base: "1rem", md: "2rem" }}
                _hover={{ color: "#c8c8c8" }}
              >
                Notes
              </Heading>
            </NextLink>
            <a
              href="mailto:hello@javier.onl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Heading
                cursor="pointer"
                as="h2"
                fontSize={sizeMe}
                color="#b3b3b3"
                _hover={{ color: "#c8c8c8" }}
              >
                Contact
              </Heading>
            </a>
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
                <Heading fontSize="1rem" color="#b3b3b3">
                  Get featured on Pond
                </Heading>
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
            <Heading cursor="pointer" as="h1" fontSize={sizeMe} color="#b3b3b3">
              Pond
            </Heading>
          </NextLink>
          <Spacer />
          <Menu>
            <MenuButton
              as={Button}
              size="xs"
              aria-label="Options"
              variant="unstyle"
              bg="transparent"
              _focus={{ outline: 0, bg: "transparent" }}
              _active={{ bg: "transparent" }}
              _selected={{ bg: "transparent" }}
            >
              <MdControlPoint color="#b3b3b3" fontSize="20px" />
            </MenuButton>
            <MenuList
              bg="rgba(10 ,10,10,0.9)"
              style={{ backdropFilter: "blur(2px)" }}
              borderColor="#606060"
              minW="0"
              w="150px"
              p="2px"
            >
              <MenuItem
                display="flex"
                justifyContent="flex-end"
                _focus={{ bg: "rgba(10 ,10,10,0.7)" }}
                _active={{ bg: "rgba(10 ,10,10,0.7)" }}
              >
                <Heading
                  cursor="pointer"
                  as="h2"
                  fontSize={sizeMe}
                  color="#b3b3b3"
                  onClick={onOpen}
                >
                  Get Featured
                </Heading>
              </MenuItem>
              <NextLink href="/notes" passHref>
                <MenuItem
                  display="flex"
                  justifyContent="flex-end"
                  _focus={{ bg: "rgba(10 ,10,10,0.7)" }}
                  _active={{ bg: "rgba(10 ,10,10,0.7)" }}
                >
                  <Heading
                    cursor="pointer"
                    as="h1"
                    fontSize={sizeMe}
                    color="#b3b3b3"
                  >
                    Notes
                  </Heading>
                </MenuItem>
              </NextLink>
              <a
                href="mailto:hello@javier.onl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MenuItem
                  display="flex"
                  justifyContent="flex-end"
                  _focus={{ bg: "rgba(10 ,10,10,0.7)" }}
                  _active={{ bg: "rgba(10 ,10,10,0.7)" }}
                >
                  <Heading
                    cursor="pointer"
                    as="h2"
                    fontSize={sizeMe}
                    color="#b3b3b3"
                  >
                    Contact
                  </Heading>
                </MenuItem>
              </a>
            </MenuList>
          </Menu>
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
              <Heading fontSize="1rem" color="#b3b3b3">
                Get featured on Pond
              </Heading>
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
