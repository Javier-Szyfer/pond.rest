import { useState } from "react";
import Image from "next/image";

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
  const [isMobile] = useMediaQuery([
    "(max-width: 767px",
    "(display-mode: browser )",
  ]);

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
  if (!isMobile) {
    return (
      <>
        <Container maxW="container.xl">
          <Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 428.07 285.86"
              style={{ fill: "#b3b3b3", width: "50%" }}
            >
              <defs></defs>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d="M11.27,285.86a9.82,9.82,0,0,1-8.1-4.06C1.06,279.09,0,276.54,0,274.13V89.27q0-5.1,6.16-8.71T17.61,77h67.6A23.4,23.4,0,0,1,97,80.56q6.15,3.6,6.16,8.71V195.68q0,4.22-4.75,8.57t-9.69,4.36H35.56q-3.53,0-8.09,3.76c-3.06,2.5-4.58,4.75-4.58,6.76v55c0,2.41-1.18,5-3.52,7.67A10.49,10.49,0,0,1,11.27,285.86Zm12-142.78c0,2.4,1.23,4.81,3.7,7.21a11.92,11.92,0,0,0,8.62,3.61H67.61a11.94,11.94,0,0,0,8.62-3.61c2.47-2.4,3.7-4.81,3.7-7.21q0-5.12-4.75-8.57a17.84,17.84,0,0,0-10.74-3.45H38.73A17.84,17.84,0,0,0,28,134.51Q23.24,138,23.24,143.08Z" />
                  <path d="M120.39,207.71a26.63,26.63,0,0,1-7.57-4.66c-2.46-2.11-3.69-4.46-3.69-7.07V89.27q0-5.1,6.16-8.71T126.73,77h67.61a23.37,23.37,0,0,1,11.79,3.61q6.17,3.6,6.17,8.71V196q0,4.22-4.76,8.27t-9.68,4.06h-74.3a6.75,6.75,0,0,1-1.41-.3A6.65,6.65,0,0,0,120.39,207.71Zm12-64.63q0,3.91,3.69,7.36a12.22,12.22,0,0,0,8.63,3.46h32a12.22,12.22,0,0,0,8.63-3.46c2.46-2.3,3.7-4.75,3.7-7.36q0-5.12-4.76-8.42a18.39,18.39,0,0,0-10.74-3.3h-25.7a18.37,18.37,0,0,0-10.74,3.3Q132.36,138,132.37,143.08Z" />
                  <path d="M309.31,208.31a11,11,0,0,1-8.1-3.61c-2.35-2.41-3.52-4.91-3.52-7.52v-55q0-4.52-5.64-7.67a21.31,21.31,0,0,0-10.21-3.15h-25.7a19.45,19.45,0,0,0-4.93.75,20.31,20.31,0,0,0-5.11,2.1,17.07,17.07,0,0,0-4,3.31,6,6,0,0,0-1.76,4.06v55q0,3.91-3.34,7.82a10.48,10.48,0,0,1-8.28,3.91,10.68,10.68,0,0,1-7.92-3.46,10.78,10.78,0,0,1-3.34-7.67V89.27q0-5.1,6.16-8.71T235,77h67.61a23.37,23.37,0,0,1,11.79,3.61q6.16,3.6,6.16,8.71V196.58a12.13,12.13,0,0,1-3.17,8A10.1,10.1,0,0,1,309.31,208.31Z" />
                  <path d="M416.8,0a10.1,10.1,0,0,1,8.1,3.76,12.2,12.2,0,0,1,3.17,8V196q0,4.22-4.75,8.27t-9.68,4.06h-74.3q-4.93,0-9.68-4.06T324.9,196V89.27a7.49,7.49,0,0,1,1.76-4.65,19.34,19.34,0,0,1,4.4-4.06,24.74,24.74,0,0,1,5.64-2.86,17.47,17.47,0,0,1,5.81-1h51.76a5.86,5.86,0,0,0,3.17-1.2A29.28,29.28,0,0,0,401,72.59a20.75,20.75,0,0,0,3-3.46,5.75,5.75,0,0,0,1.23-3v-55a11,11,0,0,1,3.35-7.51A10.8,10.8,0,0,1,416.8,0ZM348.14,143.08c0,2.61,1.24,5.06,3.7,7.36a12.21,12.21,0,0,0,8.63,3.46h32a12.2,12.2,0,0,0,8.62-3.46q3.71-3.45,3.7-7.36,0-5.12-4.75-8.42a18.39,18.39,0,0,0-10.74-3.3h-25.7a18.37,18.37,0,0,0-10.74,3.3Q348.15,138,348.14,143.08Z" />
                </g>
              </g>
            </svg>
          </Box>

          <Box p="2rem 0 0 0" maxW={{ md: "700px" }} display="flex">
            <Text color="#b3b3b3" fontWeight="normal">
              This site is dedicated to those who enjoy music created with a
              modular synthesizer. <br /> Who find beauty in creating their
              <span style={{ fontWeight: "bold" }}> own instrument</span> and
              therefore a{" "}
              <span style={{ fontWeight: "bold" }}> personal sound.</span>{" "}
              <br />
              Patching for a specific result or just to see what happens. <br />
              <span style={{ fontWeight: "bold" }}>
                An intimate relationship with machines.
              </span>
            </Text>
          </Box>

          <Divider bg="#313131" maxW="600px" mt="12px" />
          <Box maxW="500px">
            <form onSubmit={handleSubscribe}>
              <FormLabel color="#b3b3b3" mt=".5rem" fontWeight="medium">
                Keep up to date
              </FormLabel>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
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
  return (
    <>
      <Container maxW="container.xl">
        <Box
          pb="12px"
          maxW={{ base: "500px", sm: "500px", md: "700px", lg: "1000px" }}
          display="flex"
          w="100%"
        >
          <Text color="#b3b3b3" fontWeight="normal">
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
        <Divider bg="#313131" m="1rem 0" maxW="500px" />

        <Box
          maxW="500px"
          p="0"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <form onSubmit={handleSubscribe}>
            <FormLabel color="#b3b3b3" fontWeight="medium">
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
