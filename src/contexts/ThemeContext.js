import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
    fontSize: 16,
    body2: {
      fontSize: 16,
    },
    h1: {
      fontSize: 27,
      fontWeight: 800,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 21,
    },
    h4: {
      fontSize: 19,
    },
  },
  palette: {
    primary: {
      main: "#0C776B",
    },
    secondary: {
      main: "#997B0C",
    },
  },
  overrides: {
    MuiButton: {
      text: {
        color: "var(--primary-color)",
      },
    },
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
});

const StyleProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default StyleProvider;
