import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createTheme({
  typography: {
    fontSize: 10,
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
