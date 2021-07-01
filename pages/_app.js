import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { AuthProvider } from "../lib/auth";
import { MusicPlayerProvider } from "../context/AudioContext";
import Navigation from "../components/NavBar";
import { DefaultSeo } from "next-seo";
import { MDXProvider } from "@mdx-js/react";
import SEO from "../next-seo.config";

import MDXComponents from "../components/MDXComponents";
import "../styles/styles.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MusicPlayerProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <MDXProvider components={MDXComponents}>
            <DefaultSeo {...SEO} />
            <Navigation />
            <Component {...pageProps} />
          </MDXProvider>
        </AuthProvider>
      </ChakraProvider>
    </MusicPlayerProvider>
  );
};

export default MyApp;
