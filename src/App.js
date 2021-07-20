import React from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";

import AuthProvider from "./contexts/AuthContext";
import DataProvider from "./contexts/DataContext";
import ModalProvider from "./contexts/ModalContext";
import StyleProvider from "./contexts/StyleContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./overrides.css";
import "./helpers/i18n";
// import Footer from "./components/layout/Navbar/Footer";

const App = () => {
  return (
    <StyleProvider>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <ModalProvider>
              <Router />
            </ModalProvider>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </StyleProvider>
  );
};

export default App;
