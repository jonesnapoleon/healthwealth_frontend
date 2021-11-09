import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
    fontSize: 17,
    body2: {
      fontSize: 18,
    },
    h1: {
      fontSize: 40,
      fontWeight: 800,
    },
    h2: {
      fontSize: 35,
    },
    h3: {
      fontSize: 30,
    },
    h4: {
      fontSize: 25,
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
