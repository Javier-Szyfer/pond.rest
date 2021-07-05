import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../styles/theme";
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

          {/* <meta
            content="/favicons/browserconfig.xml"
            name="msapplication-config"
          />
          <link href="/favicons/favicon.ico" rel="shortcut icon" />
          <link href="/favicons/site.webmanifest" rel="manifest" /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          /> */}
          {/* <link rel="stylesheet" href="/fonts/fonts.css" /> */}
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
