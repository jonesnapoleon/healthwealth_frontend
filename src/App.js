import React from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";

import Navbar from "./components/layout/Navbar";
import AuthProvider from "./contexts/AuthContext";
import DataProvider from "./contexts/DataContext";
import ModalProvider from "./contexts/ModalContext";

import "bootstrap/dist/css/bootstrap.min.css"; 
import "./index.css";
import "./overrides.css";
import "./helpers/i18n";
import Footer from "./components/layout/Navbar/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <ModalProvider>
            <div className="background-general">
              <Navbar />
              <Router />
            </div>
            <Footer />
          </ModalProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
