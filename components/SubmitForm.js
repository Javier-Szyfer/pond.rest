import { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  FormLabel,
  Button,
  Progress,
  useToast,
} from "@chakra-ui/react";

//firebase
import firebase from "../lib/firebase";

export default function SubmitForm() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);

    const projectFirestore = firebase.firestore();
    const collectionRef = projectFirestore.collection("submissions");
    try {
      await collectionRef.add({
        email,
        url,
        message,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.log(err);
    }
    setSuccess(false);
    setEmail("");
    setUrl("");
    setMessage("");
    toast({
      title: "Done!",
      description: "Thanks for your submission",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p="1rem 0">
      <form onSubmit={handleSubmit}>
        <FormLabel mt=".5rem">Email </FormLabel>
        <Input
          type="email"
          variant="outline"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          _focus={{ borderColor: "#909090" }}
        />
        <FormLabel mt=".5rem">Link to your music or site </FormLabel>

        <Input
          type="url"
          variant="outline"
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
          _focus={{ borderColor: "#909090" }}
        />
        <FormLabel mt=".5rem">Message </FormLabel>
        <Textarea
          placeholder="If you want to send us a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          _focus={{ borderColor: "#909090" }}
        />
        <Button type="submit" variant="solid" mt="1rem" isDisabled={success}>
          Send
        </Button>
      </form>
      {success && (
        <Progress size="xs" isIndeterminate m="1rem 0" colorScheme="orange" />
      )}
    </Box>
  );
}
