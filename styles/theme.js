import { extendTheme } from "@chakra-ui/react";
// import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      color: "whiteAlpha.900",
      bg: "rgb(10,10,10)",
    },
  },
};
// const fonts = {
//   heading: "Work Sans",
//   body: "Work Sans",
// };

const components = {
  Button: {
    // setup light/dark mode component defaults
    baseStyle: {
      bg: "#141214",
      background: "#141214",
    },
    // 4. We can override existing variants
    solid: {
      bg: "#141214",
    },
  },

  Modal: {
    // setup light/dark mode component defaults
    baseStyle: {
      dialog: {
        bg: "#181818",
      },
    },
  },
};

// 3. extend the theme
const theme = extendTheme({
  config,
  styles,
  components,
  // fonts: {
  //   heading: "IBM Plex Mono",
  //   body: "IBM Plex Mono",
  // },
});
export default theme;
