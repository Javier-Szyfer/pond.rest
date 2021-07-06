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
        <FormLabel mt=".5rem" color="#b3b3b3">
          Email{" "}
        </FormLabel>
        <Input
          type="email"
          variant="outline"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          _focus={{ borderColor: "#909090" }}
          _hover={{ borderColor: "#909090" }}
          borderColor="whiteAlpha.600"
        />
        <FormLabel mt=".5rem" color="#b3b3b3">
          Link to your music or site{" "}
        </FormLabel>

        <Input
          type="url"
          variant="outline"
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
          _focus={{ borderColor: "#909090" }}
          _hover={{ borderColor: "#909090" }}
          borderColor="whiteAlpha.600"
        />
        <FormLabel mt=".5rem" color="#b3b3b3">
          Message{" "}
        </FormLabel>
        <Textarea
          placeholder="If you want to say something"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          _focus={{ borderColor: "#909090" }}
          _hover={{ borderColor: "#909090" }}
          borderColor="whiteAlpha.600"
          _placeholder={{ color: "#505050" }}
        />
        <Button
          type="submit"
          variant="solid"
          mt="1rem"
          isDisabled={success}
          _hover={{ bg: "#606060" }}
          style={{ backgroundColor: "#404040" }}
          _active={{
            transform: "scale(0.95)",
            transition: "transform .3s ease-out",
          }}
          _focus={{ outline: 0 }}
        >
          Send
        </Button>
      </form>
      {success && (
        <Progress size="xs" isIndeterminate m="1rem 0" colorScheme="orange" />
      )}
    </Box>
  );
}
