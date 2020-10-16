import React from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import App from "./App";

/**
 * This function is to find out which theme the user has as default. It runs before
 * App.js and currently does not change much due to styles further down that change
 * the look completely. Eventually I hope to have the option to change from my
 * default look with terraria backgrounds and such to dark or light theme in a
 * option setting.
 */
export default function Theme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  let theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
