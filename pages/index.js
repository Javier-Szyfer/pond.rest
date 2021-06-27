import { useState } from "react";

import { subscribeUser } from "../lib/db";

import {
  Container,
  Box,
  Text,
  Input,
  FormLabel,
  Button,
  useDisclosure,
  Divider,
  // useMediaQuery,
} from "@chakra-ui/react";

import Thumbnails from "../components/Thumbnails";
import Player from "../components/Player";
import { MdSentimentSatisfied } from "react-icons/md";

export default function Home() {
  const { isOpen, onToggle } = useDisclosure();
  // const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [wontSpam, setWontSpam] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await subscribeUser(email);
      setEmail("");
      setSubscribed(true);
      subscribedOk();
    } catch (err) {
      console.log(err);
    }
  };
  const subscribedOk = () => {
    setTimeout(() => {
      setSubscribed(false);
    }, 2000);
  };

  return (
    <>
      <Container maxW="container.xl">
        <Box
          p="2rem 0 12px 0"
          maxW={{ base: "300px", sm: "500px", md: "800px" }}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Text color="#909090" fontWeight="normal">
            This site is dedicated to those who enjoy music created with a
            modular synthesizer. Who find beauty in creating their
            <span style={{ fontWeight: "bold" }}> own instrument</span> and
            therefore a{" "}
            <span style={{ fontWeight: "bold" }}> personal sound.</span> <br />
            Patching for a specific result or just to see what happens.{" "}
            <span style={{ fontWeight: "bold" }}>
              An intimate relationship with machines.
            </span>
          </Text>
        </Box>

        <Box maxW="500px">
          <Divider />
          <form onSubmit={handleSubscribe}>
            <FormLabel color="#909090" mt=".5rem" fontWeight="medium">
              Keep up to date
            </FormLabel>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Input
                mr=".5rem"
                type="email"
                variant="outline"
                borderColor="whiteAlpha.600"
                required
                value={email}
                borderRadius="0.375rem"
                onChange={(e) => setEmail(e.target.value)}
                _focus={{ borderColor: "#909090" }}
                _hover={{ borderColor: "#909090" }}
                maxW="60%"
                placeholder="email"
                _placeholder={{ color: "#505050" }}
              />
              <Button
                type="submit"
                variant="solid"
                _focus={{ borderColor: "#909090" }}
                color="#909090"
                mr=".5rem"
                isDisabled={subscribed === true}
                _hover={{ bg: "whiteAlpha.300" }}
              >
                Submit
              </Button>
              {subscribed && (
                <MdSentimentSatisfied color="#80CFA9" size="24px" />
              )}
            </Box>
          </form>
        </Box>
        <Thumbnails onToggle={onToggle} isOpen={isOpen} />
        <Player isOpen={isOpen} onToggle={onToggle} />
      </Container>
    </>
  );
}
