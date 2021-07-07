import { AuthProvider } from "../lib/auth";
import { MusicPlayerProvider } from "../context/AudioContext";

import Navigation from "../components/NavBar";

import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

import Fonts from "../public/fonts/Fonts";

import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "../components/MDXComponents";
import { ChakraProvider, CSSReset, ColorModeProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import "../styles/styles.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MusicPlayerProvider>
      <ChakraProvider theme={theme}>
        <ColorModeProvider options={theme.config} />
        {/* <Fonts /> */}
        <CSSReset />
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
