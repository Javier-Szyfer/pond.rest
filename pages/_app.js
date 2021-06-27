import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { AuthProvider } from "../lib/auth";
import { MusicPlayerProvider } from "../context/AudioContext";
import Navigation from "../components/NavBar";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import "../styles/styles.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MusicPlayerProvider>
      <ChakraProvider theme={theme}>
        <DefaultSeo {...SEO} />
        <AuthProvider>
          <Navigation />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </MusicPlayerProvider>
  );
};

export default MyApp;
