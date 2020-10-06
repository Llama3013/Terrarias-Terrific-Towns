import React from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import App from "./App";

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
