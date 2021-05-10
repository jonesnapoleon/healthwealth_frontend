import React from "react";
import {
  Box,
  Button,
  Text,
  Avatar,
  Row,
  Stack,
  Column,
  Container,
  Heading,
} from "gestalt";
import "gestalt/dist/gestalt.css";
import { auth } from "../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../firebase/firebaseSlice";
import { resetSignee } from "../Assign/AssignSlice";
import { navigate, Link } from "@reach/router";
import "./Profile.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  const email = user?.email;

  return (
    <Box
      paddingX={12}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: "var(--text-color) " },
      }}
    >
      <Box paddingX={12}>
        <Box display="flex" direction="row" paddingY={2}>
          <Column span={9}>
            <Box padding={3}>
              <Link to="/" className="profileLink">
                <Heading size="lg">Sign App</Heading>
              </Link>
            </Box>
          </Column>
          <Column span={3}>
            <Box
              padding={3}
              dangerouslySetInlineStyle={{
                __style: { textAlign: "right" },
              }}
            >
              <Row justifyContent="end">
                <Box padding={1} justifyContent="flex-end">
                  <Avatar name={displayName} size="sm" src={photoURL} />
                </Box>
                <Stack>
                  <Text weight="bold">{displayName}</Text>
                  <Text>{email}</Text>
                </Stack>
                <Box padding={1}>
                  <Button
                    onClick={() => {
                      auth.signOut();
                      dispatch(setUser(null));
                      dispatch(resetSignee());
                      navigate("/");
                    }}
                    accessibilityLabel="Sign out of your account"
                    text="Sign out"
                  />
                </Box>
              </Row>
            </Box>
          </Column>
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
