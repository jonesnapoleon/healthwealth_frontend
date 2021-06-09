import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import New from "./components/Assign/New";
// import Preparation from "./components/PrepareDocument/Preparation";
// import Sign from "./components/SignDocument/Sign";
// import View from "./components/ViewDocument/View";
import SignIn from "./components/@Auth";
import Landing from "./components/@Landing";
import LayoutWrapper from "./components/layout/Wrapper";
// import { auth, generateUserDocument } from "./firebase/firebase";
// import { setUser, selectUser } from "./api/authSlice";
import "./index.css";
import "./overrides.css";
import "./helpers/i18n";

import Me from "./components/@Sign/@Me";
import All from "./components/@Sign/@All";
// import LoadingBackdrop from "./components/commons/LoadingBackdrop";
import Navbar from "./components/layout/Navbar";
import AuthProvider from "./contexts/AuthContext";
import Settings from "./components/@Settings";
import Docs from "./components/@Docs";
import DataProvider from "./contexts/DataContext";

const App = () => {
  // const user = "";
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
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <div className="background-general">
            <Navbar />
            <Switch>
              <Route component={SignIn} path={"/login"} exact />
              <Route render={() => <Me />} path={"/me"} exact />
              <Route render={() => <All />} path={"/all"} exact />
              <Route
                render={() => (
                  <LayoutWrapper>
                    <Landing />
                  </LayoutWrapper>
                )}
                path={"/sign"}
                exact
              />
              <Route
                render={() => (
                  <LayoutWrapper>
                    <Settings />
                  </LayoutWrapper>
                )}
                path={"/settings"}
                exact
              />
              <Route
                render={() => (
                  <LayoutWrapper>
                    <Docs />
                  </LayoutWrapper>
                )}
                path={"/docs"}
                exact
              />
              {/* <LayoutWrapper>
            </LayoutWrapper> */}
              {/* <Route component={Settings} path={'/docs'}/> */}

              {/* <New path="/new" />
            <Preparation path="/prepareDocument" />
            <Sign path="/signDocument" />
          <View path="/viewDocument" /> */}
            </Switch>
          </div>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
