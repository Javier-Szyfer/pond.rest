import { useState } from "react";
import { useAuth } from "../lib/auth";
import Image from "next/image";

//firebase
import firebase from "../lib/firebase";

import {
  Box,
  Container,
  SimpleGrid,
  Input,
  FormLabel,
  Button,
  Heading,
  Progress,
} from "@chakra-ui/react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [artistName, setArtistName] = useState("");
  const [trackName, setTrackName] = useState("");
  const [trackDuration, setTrackDuration] = useState("");
  const [artistContact, setArtistContact] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [audio, setAudio] = useState("");
  console.log(image);

  const date = new Date().toISOString();

  const [success, setSuccess] = useState(false);

  const handleImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAudio = (e) => {
    let files = e.target.files;
    setFile(files[0]);

    const aud = URL.createObjectURL(files[0]);
    setAudio(aud);
    document.getElementById("audio").load();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(true);

    const projectFirestore = firebase.firestore();
    const collectionRef = projectFirestore.collection("performances");

    const refAudio = firebase
      .storage()
      .ref(`audios/${artistName}/${date}`)
      .child(file.name);
    await refAudio.put(file);

    const refImage = firebase
      .storage()
      .ref(`images/${artistName}/${date}`)
      .child(image.name);
    await refImage.put(image);

    const urlAudio = await refAudio.getDownloadURL();
    const urlImage = await refImage.getDownloadURL();

    await collectionRef
      .add({
        urlAudio,
        urlImage,
        createdAt: new Date().toISOString(),
        artistContact,
        artistName,
        trackDuration,
        trackName,
      })
      .then(() => {
        setSuccess(false);
        setArtistName("");
        setFile("");
        setArtistContact("");
        setAudio("");
        setTrackName("");
        setTrackDuration("");
        setPreviewImage(null);
      });
  };
  if (user) {
    return (
      <Box display="flex" minH="100vh">
        <Container
          maxW="container.xl"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p="2rem 0"
        >
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <SimpleGrid w="100%" columns={{ base: 1, md: 2 }}>
              <Box
                maxW={{ base: "100%", sm: "80%" }}
                p="1rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <FormLabel htmlFor="inputFile" mb="1rem">
                  Artist Name
                </FormLabel>
                <Input
                  required
                  mb="1rem"
                  type="text"
                  variant="outline"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
                <FormLabel htmlFor="inputFile" mb="1rem">
                  Track Name
                </FormLabel>
                <Input
                  required
                  mb="1rem"
                  type="text"
                  variant="outline"
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)}
                />
                <FormLabel htmlFor="inputFile" mb="1rem">
                  Track Duration
                </FormLabel>
                <Input
                  required
                  mb="1rem"
                  type="text"
                  variant="outline"
                  value={trackDuration}
                  onChange={(e) => setTrackDuration(e.target.value)}
                />
                <FormLabel htmlFor="inputFile" mb="1rem">
                  Artists Contact Link
                </FormLabel>
                <Input
                  required
                  mb="1rem"
                  type="url"
                  variant="outline"
                  value={artistContact}
                  onChange={(e) => setArtistContact(e.target.value)}
                />
                <FormLabel
                  htmlFor="inputFile"
                  mb="1rem"
                  p="4px 2px"
                  bg="darkseagreen"
                  border="1px solid #202020"
                  borderRadius="0.375rem"
                  maxW="150px"
                  textAlign="center"
                >
                  Select Track
                </FormLabel>
                <Input
                  required
                  accept=".mp3, .wav"
                  type="file"
                  id="inputFile"
                  onChange={handleAudio}
                  display="none"
                />
                <audio id="audio" controls style={{ maxWidth: "250px" }}>
                  <source id="src" src={audio} type="audio/mpeg" />
                </audio>
              </Box>
              <Box
                maxW={{ base: "100%", sm: "80%" }}
                p="1rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box border="1px solid #909090" boxSize="sm" mb="2rem">
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="artist image"
                      objectFit="cover"
                      width={500}
                      height={500}
                    />
                  )}
                </Box>
                <FormLabel
                  htmlFor="imageFile"
                  mb="1rem"
                  p="4px 8px"
                  bg="darkseagreen"
                  border="1px solid #202020"
                  borderRadius="0.375rem"
                  maxW="250px"
                  textAlign="center"
                >
                  Select Image
                </FormLabel>
                <Input
                  required
                  accept=".jpeg, .jpg"
                  type="file"
                  id="imageFile"
                  onChange={handleImage}
                  display="none"
                />
              </Box>
            </SimpleGrid>
            <Button
              m="2rem 0"
              ml="1rem"
              type="submit"
              bg="facebook.400"
              color="white"
            >
              Upload
            </Button>

            {success && (
              <Progress
                size="xs"
                isIndeterminate
                m="1rem 0"
                colorScheme="orange"
              />
            )}
          </form>
        </Container>
      </Box>
    );
  } else {
    return (
      <Container
        maxW="container.xl"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1"> This is only for admins</Heading>
      </Container>
    );
  }
}
