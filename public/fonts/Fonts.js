import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
          @font-face {
            font-family: "Italiana";
            src: url('./fonts/Italiana-Regular.woff2') format("woff2"),
             url('./fonts/Italiana-Regular.woff") format("woff"),
             url('./fonts/Italiana-Regular.ttf') format("truetype");
            font-weight: normal;
            font-style: normal;
            font-display: swap;
            }
        `}
  />
);

export default Fonts;
