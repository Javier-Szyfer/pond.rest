import { useState } from "react";

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { MdClose, MdExpandLess, MdExpandMore } from "react-icons/md";

export default function Player({ isOpen, onToggle }) {
  const { selectedTrack, setTrackData } = useMusicPlayer();
  const [expandMore, setExpandMore] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 840px)");
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  return (
    <Slide direction="bottom" in={isOpen} style={{ zIndex: 999 }} unmountOnExit>
      <Box
        bg={expandMore ? "rgba(15 ,15,15,0.7)" : "rgba(25 ,25,25,0.8)"}
        style={{ backdropFilter: "blur(3px)" }}
        maxH={isMobile ? "100vh" : "50vh"}
        p=".5rem 0"
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
            <Box onClick={onOpen}>
              <Heading as="h4" fontSize="12px" color="#b3b3b3" cursor="pointer">
                {selectedTrack?.artistName}
              </Heading>
              <Heading
                as="h5"
                fontWeight="light"
                fontSize="12px"
                color="#b3b3b3"
                cursor="pointer"
              >
                {selectedTrack?.trackName}
              </Heading>
            </Box>
          </Box>

          <Box w={isMobile ? "full" : "70%"}>
            {isMobile && (
              <Box
                display="flex"
                alignItems="center"
                flexDirection={expandMore ? "column" : "row"}
                w="full"
                justifyContent="space-between"
                p="4px 0"
              >
                <Box
                  display={expandMore ? "none" : "flex"}
                  alignItems="center"
                  w="100%"
                >
                  <Heading
                    as="h4"
                    fontSize="12px"
                    mr=".5rem"
                    cursor="pointer"
                    color="#a8a8a8"
                  >
                    {selectedTrack?.artistName}
                  </Heading>
                  <span style={{ marginRight: ".5rem", color: "#a8a8a8" }}>
                    -
                  </span>
                  <Heading
                    as="h5"
                    fontWeight="light"
                    fontSize="12px"
                    color="#a8a8a8"
                    maxW={{ base: "210px", sm: "280px" }}
                    isTruncated
                  >
                    {selectedTrack?.trackName}
                  </Heading>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  w={expandMore && "100%"}
                >
                  {expandMore ? (
                    <MdExpandMore
                      cursor="pointer"
                      color="rgb(133, 133, 133)"
                      size="30px"
                      mr="30px"
                      onClick={() => {
                        setExpandMore(!expandMore);
                      }}
                    />
                  ) : (
                    <MdExpandLess
                      cursor="pointer"
                      color="rgb(133, 133, 133)"
                      size="30px"
                      mr="30px"
                      onClick={() => {
                        setExpandMore(!expandMore);
                      }}
                    />
                  )}

                  <MdClose
                    cursor="pointer"
                    ml="30px"
                    color="rgb(133, 133, 133)"
                    size="20px"
                    onClick={() => {
                      onToggle(), setTrackData(null), setExpandMore(false);
                    }}
                  />
                </Box>
                {expandMore && (
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Heading as="h6" size="sm">
                      {selectedTrack?.artistName}
                    </Heading>
                    <Text fontSize="12px"> {selectedTrack?.trackName}</Text>
                    <Box
                      w={{ base: "30vh", sm: "50vh" }}
                      m="1rem 0"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src={selectedTrack?.urlImage}
                        alt="artist pic"
                        width={300}
                        height={300}
                        objectFit="cover"
                      />
                    </Box>
                    {selectedTrack?.artistContact && (
                      <Text
                        fontSize="12px"
                        display="flex"
                        justifyContent="center"
                      >
                        Listen more of {selectedTrack?.artistName}s music
                        <NextLink href={selectedTrack?.artistContact} passHref>
                          <a
                            target="_blank"
                            rel="noopener"
                            style={{ marginLeft: "4px", fontWeight: "bold" }}
                          >
                            here
                          </a>
                        </NextLink>
                      </Text>
                    )}
                  </Box>
                )}
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
                RHAP_UI.DURATION,
                RHAP_UI.VOLUME,
              ]}
              customVolumeControls={[]}
              customAdditionalControls={[]}
            />
          </Box>
          {!isMobile && (
            <MdClose
              cursor="pointer"
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
              {selectedTrack?.artistContact && (
                <Text fontSize="12px" display="flex" justifyContent="center">
                  Listen more of {selectedTrack?.artistName}s music
                  <NextLink href={selectedTrack?.artistContact} passHref>
                    <a
                      target="_blank"
                      rel="noopener"
                      style={{ marginLeft: "4px", fontWeight: "bold" }}
                    >
                      here
                    </a>
                  </NextLink>
                </Text>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Slide>
  );
}
