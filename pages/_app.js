// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "../lib/auth";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
