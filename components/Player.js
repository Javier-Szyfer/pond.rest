import { useState } from "react";

import Image from "next/image";
import NextLink from "next/link";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";

import useMusicPlayer from "../hooks/useMusicPlayer";

import {
  Box,
  Heading,
  Container,
  Slide,
  Spinner,
  Text,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import {
  MdClose,
  MdExpandLess,
  MdExpandMore,
  MdControlPoint,
} from "react-icons/md";

export default function Player({ isOpen, onToggle, setStartAnim }) {
  const { selectedTrack } = useMusicPlayer();
  const [loadingTrack, setLoadingTrack] = useState(false);
  const [expandMore, setExpandMore] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 970px)");
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

  if (selectedTrack) {
    return (
      <Slide
        direction="bottom"
        in={isOpen}
        style={{ zIndex: 999 }}
        unmountOnExit
      >
        <Box
          bg={expandMore ? "rgba(15 ,15,15,0.8)" : "rgba(25 ,25,25,0.8)"}
          style={{ backdropFilter: "blur(3px)" }}
          maxH={isMobile ? "100vh" : "50vh"}
          minH={{ base: "10vh", md: "15vh" }}
          p=".5rem 0"
          width="100vw"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
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
              <Box
                w="90px"
                mr="1rem"
                cursor="pointer"
                onClick={onOpen}
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
                position="relative"
              >
                <Image
                  src={selectedTrack?.urlImage}
                  alt="artist pic"
                  width={300}
                  height={300}
                  objectFit="cover"
                  layout="responsive"
                  priority
                />
                {showButton && (
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                    h="100%"
                    style={{ backdropFilter: "blur(1px)" }}
                    cursor="pointer"
                  >
                    <MdControlPoint
                      fontSize="30px"
                      color="rgba(255,255,255,0.7)"
                    />
                  </Box>
                )}
              </Box>
              <Box onClick={onOpen}>
                <Heading
                  as="h4"
                  fontSize="12px"
                  color="#b3b3b3"
                  cursor="pointer"
                >
                  {selectedTrack?.artistName}
                </Heading>
                <Heading
                  as="h5"
                  fontWeight="light"
                  fontSize="12px"
                  color="#b3b3b3"
                  cursor="pointer"
                  maxW="200px"
                  isTruncated
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
                      mr=".3rem"
                      cursor="pointer"
                      color="#a8a8a8"
                      whiteSpace="nowrap"
                    >
                      {selectedTrack?.artistName}
                    </Heading>
                    <span style={{ marginRight: ".3rem", color: "#a8a8a8" }}>
                      -
                    </span>
                    <Heading
                      as="h5"
                      fontWeight="light"
                      fontSize="12px"
                      color="#a8a8a8"
                      maxW={{ base: "180px", sm: "280px" }}
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
                        onToggle(),
                          // setTrackData(null),
                          setExpandMore(false),
                          setStartAnim(false);
                      }}
                    />
                  </Box>
                  {expandMore && (
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <Heading as="h6" size="sm" color="#b3b3b3">
                        {selectedTrack?.artistName}
                      </Heading>
                      <Text fontSize="12px" color="#b3b3b3">
                        {selectedTrack?.trackName}
                      </Text>
                      <Box
                        w={{ base: "100vh", sm: "50vh" }}
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
                          color="#b3b3b3"
                        >
                          Listen more of {selectedTrack?.artistName}s music
                          <NextLink
                            href={selectedTrack?.artistContact}
                            passHref
                          >
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
                className={loadingTrack && "isLoading"}
                onLoadStart={() => setLoadingTrack(true)}
                onLoadedMetaData={() => setLoadingTrack(false)}
                showJumpControls={false}
                autoPlay={true}
                autoPlayAfterSrcChange={true}
                src={selectedTrack?.urlAudio}
                layout="horizontal-reverse"
                onPlay={() => setStartAnim(true)}
                onPause={() => setStartAnim(false)}
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
              {loadingTrack && (
                <Box display="flex" p=".5rem 0">
                  <Spinner color="#b3b3b3" size="xs" />
                </Box>
              )}
            </Box>
            {!isMobile && (
              <MdClose
                cursor="pointer"
                ml="10px"
                color="rgb(133, 133, 133)"
                size="20px"
                onClick={() => {
                  onToggle();
                  setStartAnim(false);
                }}
              />
            )}
          </Container>
        </Box>
        <Modal
          isOpen={isModalOpen}
          onClose={onClose}
          isCentered
          size={isMobile ? "xs" : "lg"}
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
                <Heading as="h6" size="sm" color="#b3b3b3">
                  {selectedTrack?.artistName}
                </Heading>
                <Text fontSize="12px" color="#b3b3b3">
                  {" "}
                  {selectedTrack?.trackName}
                </Text>
                <Box w={{ base: "200px", md: "400px" }} m="1rem 0">
                  <Image
                    src={selectedTrack?.urlImage}
                    alt="artist pic"
                    width={400}
                    height={400}
                    objectFit="cover"
                    priority
                  />
                </Box>
                {selectedTrack?.artistContact && (
                  <Text
                    fontSize="12px"
                    display="flex"
                    justifyContent="center"
                    color="#b3b3b3"
                  >
                    Listen more of {selectedTrack?.artistName}&#x27;s music
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
  return null;
}
