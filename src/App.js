import React, { useEffect, Suspense, lazy } from "react";
// import { Router } from "@reach/router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import New from "./components/Assign/New";
import Preparation from "./components/PrepareDocument/Preparation";
import Sign from "./components/SignDocument/Sign";
import View from "./components/ViewDocument/View";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import LayoutWrapper from "./components/layout/Wrapper";
// import { auth, generateUserDocument } from "./firebase/firebase";
// import { setUser, selectUser } from "./api/authSlice";
import "./index.css";
import "./overrides.css";
import "./helpers/i18n";

import LoadingBackdrop from "./components/commons/LoadingBackdrop";
import Navbar from "./components/layout/Navbar";
import AuthProvider from "./contexts/AuthContext";
import Settings from "./components/Settings";

const App = () => {
  const user = "";
  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();

  useEffect(() => {
    // auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const user = await generateUserDocument(userAuth);
    //     const { uid, displayName, email, photoURL } = user;
    //     dispatch(setUser({ uid, displayName, email, photoURL }));
    //   }
    // });
  }, []);

  return (
    <AuthProvider>
      <div className="background-general">
        <Router>
          <Navbar />
          <LayoutWrapper>
            <Route component={Landing} path={"/sign"} exact />
            <Route component={SignIn} path={"/login"} exact />
            <Route component={Settings} path={"/settings"} exact />
            {/* <Route component={Settings} path={'/docs'}/> */}

            {/* <New path="/new" />
            <Preparation path="/prepareDocument" />
            <Sign path="/signDocument" />
            <View path="/viewDocument" /> */}
          </LayoutWrapper>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
