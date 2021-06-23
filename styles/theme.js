// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "#101010")(props),
    },
  }),
};
const components = {
  Button: {
    // setup light/dark mode component defaults
    baseStyle: (props) => ({
      bg: mode("transparent", "#141214")(props),
    }),
    // 4. We can override existing variants
    solid: (props) => ({
      color: mode("red", "whiteAlpha.900")(props),
    }),
  },

  Modal: {
    // setup light/dark mode component defaults
    baseStyle: (props) => ({
      dialog: {
        bg: mode("white", "#141214")(props),
      },
    }),
  },
};
// 3. extend the theme
const theme = extendTheme({ config, styles, components });
export default theme;
