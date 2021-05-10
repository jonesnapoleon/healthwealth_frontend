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
// import { auth } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../api/authSlice";
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
      lgPaddingX={12}
      smPaddingX={0}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: "var(--text-color) " },
      }}
    >
      <Box lgPaddingX={12} smPaddingX={0}>
        <Box display="flex" direction="row" lgPaddingY={2} smPaddingX={0}>
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
                <Box padding={1}>
                  <Avatar name={displayName} size="sm" src={photoURL} />
                </Box>
                <Stack>
                  <Text weight="bold">{displayName}</Text>
                  <Text>{email}</Text>
                </Stack>
                <Box padding={1}>
                  <Button
                    onClick={() => {
                      // auth.signOut();
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
