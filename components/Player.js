import Image from "next/image";
import NextLink from "next/link";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";

import useMusicPlayer from "../hooks/useMusicPlayer";

import {
  Box,
  Heading,
  Container,
  Slide,
  Text,
  useMediaQuery,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

export default function Player({ isOpen, onToggle }) {
  const { selectedTrack, setTrackData } = useMusicPlayer();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  return (
    <Slide direction="bottom" in={isOpen} style={{ zIndex: 99 }} unmountOnExit>
      <Box
        position="fixed"
        bottom="0"
        left="0"
        bg={
          colorMode === "light"
            ? "rgba(255,255,255,0.8)"
            : "rgba(10 ,10,10,0.9)"
        }
        style={{ backdropFilter: "blur(3px)" }}
        h="10vh"
        width="100vw"
      >
        <Container
          maxW="container.xl"
          h="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display={isMobile ? "none" : "flex"}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Box w="50px" mr="1rem" cursor="pointer" onClick={onOpen}>
              <Image
                src={selectedTrack?.urlImage}
                alt="artist pic"
                width={300}
                height={300}
                objectFit="cover"
              />
            </Box>
            <Heading as="h4" fontSize="16px" mr="1rem">
              {selectedTrack?.artistName}
            </Heading>
            <Heading as="h5" fontWeight="light" fontSize="12px">
              {selectedTrack?.trackName}
            </Heading>
          </Box>

          <Box w={isMobile ? "full" : "70%"}>
            {isMobile && (
              <Box
                display="flex"
                alignItems="center"
                w="full"
                justifyContent="space-between"
                p="4px 0"
              >
                <Box display="flex" alignItems="center">
                  <Heading
                    as="h4"
                    fontSize="14px"
                    mr="1rem"
                    cursor="pointer"
                    onClick={onOpen}
                  >
                    {selectedTrack?.artistName}
                  </Heading>
                  <Heading as="h5" fontWeight="light" fontSize="12px">
                    {selectedTrack?.trackName}
                  </Heading>
                </Box>
                <MdClose
                  cursor="pointer"
                  ml="10px"
                  color="rgb(133, 133, 133)"
                  size="20px"
                  onClick={() => {
                    onToggle(), setTrackData(null);
                  }}
                />
              </Box>
            )}
            <AudioPlayer
              showJumpControls={false}
              autoPlay
              src={selectedTrack?.urlAudio}
              layout="horizontal-reverse"
              // other props here
              customProgressBarSection={[
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.PLAY,
                RHAP_UI.PROGRESS_BAR,
                <Box mr="1rem"></Box>,

                RHAP_UI.DURATION,
                <Box mr="1rem"></Box>,
                RHAP_UI.VOLUME,
              ]}
              customVolumeControls={[]}
              customAdditionalControls={[]}
            />
          </Box>
          {!isMobile && (
            <MdClose
              cursor="pointer"
              // zIndex="999"
              ml="10px"
              color="rgb(133, 133, 133)"
              size="20px"
              onClick={() => {
                onToggle(), setTrackData(null);
              }}
            />
          )}
        </Container>
      </Box>
      <Modal
        isOpen={isModalOpen}
        onClose={onClose}
        isCentered
        size={isMobile ? "xs" : "md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton _focus={{ outline: "none" }} />
          <ModalBody>
            <Box
              p="2rem  0"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Heading as="h6" size="sm">
                {selectedTrack?.artistName}
              </Heading>
              <Text fontSize="12px"> {selectedTrack?.trackName}</Text>
              <Box w={{ base: "200px", md: "300px" }} m="1rem 0">
                <Image
                  src={selectedTrack?.urlImage}
                  alt="artist pic"
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              </Box>
              <Text fontSize="12px" display="flex" justifyContent="center">
                Listen more of {selectedTrack?.artistName}'s music
                <NextLink href={selectedTrack?.artistContact} passHref>
                  <a target="_blank" rel="noopener">
                    <Text
                      fontSize="12px"
                      ml="4px"
                      fontWeight="semibold"
                      cursor="pointer"
                    >
                      here
                    </Text>
                  </a>
                </NextLink>
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Slide>
  );
}
