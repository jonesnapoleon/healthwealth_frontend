import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";

import New from "./components/Assign/New";
import SignIn from "./components/SignIn/SignIn";
import Preparation from "./components/PrepareDocument/Preparation";
import Sign from "./components/SignDocument/Sign";
import View from "./components/ViewDocument/View";
import Welcome from "./components/Welcome/index";

// import { auth, generateUserDocument } from "./firebase/firebase";
import { setUser, selectUser } from "./api/authSlice";
import "./index.css";
import Navbar from "./components/Profile/Navbar";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const user = await generateUserDocument(userAuth);
    //     const { uid, displayName, email, photoURL } = user;
    //     dispatch(setUser({ uid, displayName, email, photoURL }));
    //   }
    // });
  }, [dispatch]);

  return !user ? (
    <div className="background-general">
      <Navbar />
      <Router>
        <Welcome path="/" />
        <New path="/new" />
        <Preparation path="/prepareDocument" />
        <Sign path="/signDocument" />
        <View path="/viewDocument" />
      </Router>
    </div>
  ) : (
    <div>
      <Router>
        <SignIn path="/" />
      </Router>
    </div>
  );
};

export default App;
