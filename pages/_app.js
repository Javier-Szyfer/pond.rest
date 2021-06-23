import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { AuthProvider } from "../lib/auth";
import { MusicPlayerProvider } from "../context/AudioContext";
import "../styles/styles.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MusicPlayerProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </MusicPlayerProvider>
  );
};

export default MyApp;
