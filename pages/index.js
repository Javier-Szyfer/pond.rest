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
  useMediaQuery,
} from "@chakra-ui/react";

import Thumbnails from "../components/Thumbnails";
import Player from "../components/Player";
import { MdSentimentSatisfied } from "react-icons/md";

export default function Home() {
  const { isOpen, onToggle } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [wontSpam, setWontSpam] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setWontSpam(true);

    try {
      await subscribeUser(email);
      setEmail("");
      setSubscribed(true);
      setIsDisabled(false);
      subscribedOk();
    } catch (err) {
      console.log(err);
    }
  };
  const subscribedOk = () => {
    setTimeout(() => {
      setWontSpam(false);
      setSubscribed(false);
    }, 2000);
  };

  return (
    <>
      <Container maxW="container.xl">
        <Box
          p="2rem 0 12px 0"
          maxW={{ base: "400px", sm: "500px", md: "800px", lg: "1000px" }}
          display="flex"
          // justifyContent="flex-start"
          // alignItems="flex-end"
        >
          <Text
            color="#b3b3b3"
            fontWeight="normal"
            mt={{ base: 0, sm: "18rem" }}
            // textAlign={isMobile ? "center" : "left"}
          >
            This site is dedicated to those who enjoy music created with a
            modular synthesizer. <br /> Who find beauty in creating their
            <span style={{ fontWeight: "bold" }}> own instrument</span> and
            therefore a{" "}
            <span style={{ fontWeight: "bold" }}> personal sound.</span> <br />
            Patching for a specific result or just to see what happens. <br />
            <span style={{ fontWeight: "bold" }}>
              An intimate relationship with machines.
            </span>
          </Text>
        </Box>

        <Box maxW="500px">
          <Divider bg="#313131" />
          <form onSubmit={handleSubscribe}>
            <FormLabel color="#b3b3b3" mt=".5rem" fontWeight="medium">
              Keep up to date
            </FormLabel>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Input
                mr=".5rem"
                type="email"
                variant="outline"
                borderColor="whiteAlpha.300"
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
                isDisabled={isDisabled}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Submit
              </Button>
              {subscribed && (
                <MdSentimentSatisfied color="#80CFA9" size="24px" />
              )}
            </Box>
          </form>
          {wontSpam && (
            <Text color="#b3b3b3" fontSize="14px" mt="4px">
              we wont spam you, it&aposs a promise
            </Text>
          )}
        </Box>
        <Thumbnails onToggle={onToggle} isOpen={isOpen} />
        <Player isOpen={isOpen} onToggle={onToggle} />
      </Container>
    </>
  );
}
