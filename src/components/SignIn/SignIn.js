import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import GoogleLogin from "react-google-login";
// import { auth, signInWithGoogle } from "../../firebase/firebase";
import { Box, Button, Container, Text, TextField, Heading } from "gestalt";
import Snackbar from "../commons/Snackbar";
import "gestalt/dist/gestalt.css";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    // auth.signInWithEmailAndPassword(email, password).catch((error) => {
    //   setError("Error signing in with password and email!");
    //   console.error("Error signing in with password and email", error);
    // });
    console.log(email);
  };
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="background-sign-in">
      <Box
        padding={8}
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: "white" },
        }}
        rounding={2}
      >
        <Container>
          <Box padding={4}>
            {error !== null && <Snackbar text={error} />}
            <Heading size="lg" align="center">
              Sign in
            </Heading>
            <Text align="center">
              Sign in leofrg frg rfget fewgr th etgrh rteyh r twryeh j yrtejr te
              wry gtertwry th teq ry te wry te wrye teq wr efrgt wqref grqet yr
              ret wryh tw ryeh te ry tew ry te wry
            </Text>
          </Box>
          <Box padding={4} display="flex" justifyContent="center">
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText=" Login with Google "
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              theme="dark"
              style={{
                width: "100%",
                textAlign: "center",
              }}
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
};
export default SignIn;
