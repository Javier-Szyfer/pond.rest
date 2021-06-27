import { useContext } from "react";

import {
  SimpleGrid,
  Box,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { formatDistance, parseISO } from "date-fns";

import { MusicPlayerContext } from "../context/AudioContext";
import useMusicPlayer from "../hooks/useMusicPlayer";

export default function Thumbnails({ onToggle, isOpen }) {
  const { colorMode } = useColorMode();
  const [state] = useContext(MusicPlayerContext);
  const { playTrack } = useMusicPlayer();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  //Light colors

  const colorsLight = (i) => {
    if (i >= 0 && i <= 3) {
      return arrayOfColorsLight[0];
    } else if (i >= 4 && i <= 7) {
      return arrayOfColorsLight[1];
    } else if (i >= 8 && i <= 11) {
      return arrayOfColorsLight[2];
    } else if (i >= 12 && i <= 15) {
      return arrayOfColorsLight[3];
    }
  };
  const arrayOfColorsLight = ["#FEFAE0", "#EED3DF", "#CAD4C4", "#9AC2C5"];

  //Dark colors
  const colorsDark = (i) => {
    if (i >= 0 && i <= 3) {
      return arrayOfColorsDark[0];
    } else if (i >= 4 && i <= 7) {
      return arrayOfColorsDark[1];
    } else if (i >= 8 && i <= 11) {
      return arrayOfColorsDark[2];
    } else if (i >= 12 && i <= 15) {
      return arrayOfColorsDark[3];
    }
  };
  const arrayOfColorsDark = ["#5F5B6B", "#3D3B3C", "#323031", "#323031"];

  const handlePlay = (tr) => {
    playTrack(tr);
    if (!isOpen) {
      onToggle();
    }
  };

  return (
    <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={4} m="2rem  0">
      {state.allTracks?.tracks?.map((tr, i) => (
        <Box
          key={tr.id}
          borderRadius="0.375rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          cursor="pointer"
          minW="100px"
          minH="100px"
          w="100%"
          h="100%"
          // bg={colorMode === "light" ? colorsLight(i) : colorsDark(i)}
          border="1px solid #505050"
          draggable
          boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
          onClick={() => handlePlay(tr)}
          _active={{
            transform: "scale(0.95)",
            transition: "transform .3s ease-out",
          }}
          p="0 1rem"
        >
          <Box
            w="100%"
            h="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <Text
              fontWeight="bold"
              fontSize="sm"
              lineHeight="1.2"
              color="#909090"
            >
              {tr.artistName}
            </Text>
            <Text
              fontSize="xs"
              fontWeight="normal"
              lineHeight="1.2"
              maxW={{ base: "120px", sm: "250px" }}
              textAlign="center"
              color="#808080"
              m="4px 0"
            >
              {tr.trackName}
            </Text>

            <Text
              fontSize="10px"
              fontWeight="light"
              position={isMobile ? "static" : "absolute"}
              bottom="8px"
              right="8px"
              color="#c2c2c2"
            >
              {formatDistance(
                parseISO(tr.createdAt),
                new Date(),

                {
                  includeSeconds: true,
                  addSuffix: true,
                }
              ).replace("about", "")}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}
