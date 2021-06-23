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
} from "@chakra-ui/react";

import Thumbnails from "../components/Thumbnails";
import Player from "../components/Player";
import { MdSentimentSatisfied } from "react-icons/md";

export default function Home() {
  const { isOpen, onToggle } = useDisclosure();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    try {
      subscribeUser(email);
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setSubscribed(true);
    subscribedOk();
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
          <Text color="#909090">
            This site is dedicated to those who enjoy music created with a
            modular synthesizer. <br /> For those who find beauty in creating
            their own instrument and therefore a sound that represents them.
            Patching for a specific result or just to see what happens. <br />
            An intimate relationship with the machines. Connecting and
            disconnecting.
          </Text>
        </Box>
        <Box maxW="500px">
          <Divider />
          <form onSubmit={handleSubscribe}>
            <FormLabel color="#909090" mt=".5rem">
              Leave your email here <br /> to keep up with uploads and
              interviews
            </FormLabel>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Input
                size="sm"
                mr=".5rem"
                type="email"
                variant="outline"
                required
                value={email}
                borderRadius="0.375rem"
                onChange={(e) => setEmail(e.target.value)}
                _focus={{ borderColor: "#909090" }}
                maxW="70%"
              />
              <Button
                type="submit"
                variant="solid"
                size="sm"
                // bg="#e8e8e8"
                // _hover={{ bg: "#e4e4e4" }}
                _focus={{ borderColor: "#909090" }}
                color="#909090"
                mr=".5rem"
              >
                Submit
              </Button>
              {subscribed && (
                <MdSentimentSatisfied color="#88D18A" size="24px" />
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
