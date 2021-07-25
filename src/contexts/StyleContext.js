import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "Helvetica, sans-serif",
    fontSize: 12,
    body2: {
      fontSize: 10,
    },
    h1: {
      fontSize: 23,
      fontWeight: 800,
    },
    h2: {
      fontSize: 20,
    },
    h3: {
      fontSize: 17,
    },
    h4: {
      fontSize: 15,
    },
  },
  palette: {
    primary: {
      main: "#2f7bf7",
    },
    secondary: {
      main: "#843bd0",
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
