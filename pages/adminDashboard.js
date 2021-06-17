import { useState } from "react";
import { useAuth } from "../lib/auth";

//firebase
import firebase from "../lib/firebase";

import {
  Box,
  Container,
  Input,
  FormLabel,
  Button,
  Heading,
  Progress,
} from "@chakra-ui/react";

export default function AdminDashboard() {
  const { user } = useAuth();
  console.log(user);
  const [artistName, setArtistName] = useState("");
  const [trackName, setTrackName] = useState("");
  const [trackDuration, setTrackDuration] = useState("");
  const [artistContact, setArtistContact] = useState("");
  const [file, setFile] = useState("");
  const [audio, setAudio] = useState("");

  const date = new Date().toISOString();

  const [success, setSuccess] = useState(false);

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

    const ref = firebase
      .storage()
      .ref(`audios/${artistName}/${date}`)
      .child(file.name);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    await collectionRef
      .add({
        url,
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
      });
  };
  if (user) {
    return (
      <Container
        maxW="container.xl"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        p="2rem 0"
      >
        <Box
          bg="white"
          p="2rem"
          border="1px solid #dfdfdf"
          borderRadius="0.375rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW={{ base: "90%", sm: "700px" }}
          w={{ base: "90%", sm: "70%" }}
        >
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormLabel htmlFor="inputFile" color="#404040" mb="1rem">
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
              Artist's Contact Link
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
              accept=".mp3, .wav"
              type="file"
              id="inputFile"
              onChange={handleAudio}
              display="none"
            />
            <audio id="audio" controls style={{ maxWidth: "250px" }}>
              <source id="src" src={audio} type="audio/mpeg" />
            </audio>
            <Button m="2rem 0" type="submit" bg="facebook.400" color="white">
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
        </Box>
      </Container>
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
