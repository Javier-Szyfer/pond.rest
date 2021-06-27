// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
// import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
// const config = {
//   initialColorMode: "dark",
//   useSystemColorMode: false,
// };

const styles = {
  global: {
    body: {
      color: "whiteAlpha.900",
      bg: "rgb(10,10,10)",
    },
  },
};

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
      color: "red",
    },
  },

  Modal: {
    // setup light/dark mode component defaults
    baseStyle: {
      dialog: {
        bg: "#141214",
      },
    },
  },
};

// 3. extend the theme
const theme = extendTheme({
  // config,
  styles,
  components,
});
export default theme;
