import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/questrial/400.css";
import "@fontsource/prata/400.css";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { AuthProvider } from "../lib/auth";
import { MusicPlayerProvider } from "../context/AudioContext";
import Navigation from "../components/NavBar";
import "../styles/styles.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MusicPlayerProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Navigation />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </MusicPlayerProvider>
  );
};

export default MyApp;
