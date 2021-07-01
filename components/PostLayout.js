import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

//get Context

import { MusicPlayerContext } from "../context/AudioContext";
import useMusicPlayer from "../hooks/useMusicPlayer";

import Player from "./Player";
import { MdPlayArrow } from "react-icons/md";
import {
  Box,
  Container,
  Button,
  Flex,
  Text,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";

export default function PostLayout({ children, meta }) {
  const [tracks, setTracks] = useState([]);
  const { isOpen, onToggle } = useDisclosure();

  const [state] = useContext(MusicPlayerContext);
  const { playTrack } = useMusicPlayer();

  useEffect(() => {
    async function trackSetter() {
      const receivedTracksFromCtx = await state?.allTracks?.tracks;
      setTracks(receivedTracksFromCtx);
    }
    trackSetter();
  }, [state]);

  console.log(meta);

  // const { meta } = frontMatter;

  const handlePlay = () => {
    const trackToPlay = tracks.find(
      (tr) =>
        tr.artistName === meta.artistName && tr.trackName === meta.trackName
    );
    // console.log(trackToPlay);

    playTrack(trackToPlay);
    if (!isOpen) {
      onToggle();
    }
  };

  return (
    <Container maxW="container.md" my="auto" p="4rem 1rem 6rem 1rem">
      <Head>
        <title>Notes - &quot;{meta.snippet}&quot;</title>
      </Head>

      <Box display="flex" flexDirection="column" w="100%">
        <Flex justifyContent="space-between" alignItems="center" m="1rem 0">
          <Text
            // color="#b3b3b3"
            fontWeight="medium"
            fontSize="14px"
            display="flex"
            justifyContent="flex-start"
          >
            {format(new Date(meta.date), "PP")}
          </Text>
          <Link href="/notes" passHref>
            <a>
              <Button size="xs" variant="outline">
                &larr; Back
              </Button>
            </a>
          </Link>
        </Flex>
        <Box w="300px">
          <Image
            src={meta.imageUrl}
            width={300}
            height={300}
            objectFit="cover"
            alt="modular synth pic"
            layout="responsive"
          />
        </Box>

        <Flex h="10vh" justifyContent="flex-start" alignItems="center">
          <Button onClick={handlePlay} mr="2rem">
            <MdPlayArrow fontSize="30px" />
          </Button>
          <Box
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            // justifyContent="flex-start"
            // alignItems="center"
          >
            <Text mr={{ base: "0px", sm: "4px" }}>{meta.artistName} -</Text>
            <Text color="#b3b3b3">{meta.trackName}</Text>
          </Box>
        </Flex>
      </Box>
      {children}
      <Player isOpen={isOpen} onToggle={onToggle} />
    </Container>
  );
}
