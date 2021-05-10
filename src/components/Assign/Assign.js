import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import {
  Box,
  Button,
  Container,
  Heading,
  TextField,
  Table,
  Text,
  Toast,
  Switch,
  Label,
} from "gestalt";
import "gestalt/dist/gestalt.css";
import Snackbar from "../commons/Snackbar";
import { addSignee, removeSignee, selectAssignees } from "./AssignSlice";

const Assign = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [addMyself, setAddMyself] = useState(false);
  const assignees = useSelector(selectAssignees);
  const dispatch = useDispatch();

  const prepare = () => {
    if (assignees.length > 0) {
      navigate(`/prepareDocument`);
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    }
  };

  const addUser = (name, email) => {
    if (name.trim() !== "" && email.trim() !== "") {
      dispatch(addSignee({ name, email }));
      setEmail("");
      setDisplayName("");
    }
  };

  const handleChangeWrap = () => {
    if (!addMyself) addUser("Jones", "Michael");
    else dispatch(removeSignee({ name: "Jones", email: "Michael" }));
    setAddMyself((a) => !a);
    setEmail("");
    setDisplayName("");
  };

  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={2}>
            <Heading size="md">Who needs to sign?</Heading>
          </Box>
          <Box padding={2}>
            <TextField
              id="displayName"
              onChange={(event) => setDisplayName(event.value)}
              placeholder="Enter recipient's name"
              label="Name"
              value={displayName}
              type="text"
            />
          </Box>
          <Box padding={2}>
            <TextField
              id="email"
              onChange={(event) => setEmail(event.value)}
              placeholder="Enter recipient's email"
              label="Email"
              value={email}
              type="email"
            />
          </Box>

          <Box padding={2}>
            <Button
              onClick={(event) => {
                addUser(displayName, email);
              }}
              text="Add user"
              color="blue"
              inline
            />
          </Box>
          <Box padding={2} marginTop={2}>
            <Box display="flex">
              <Box marginEnd={2}>
                <Switch
                  id="addMyself"
                  onChange={handleChangeWrap}
                  switched={addMyself}
                />
              </Box>
              <Label htmlFor="addMyself" inline>
                <Text inline>Add myself</Text>
              </Label>
            </Box>
          </Box>

          {assignees && assignees?.length > 0 && (
            <Box paddingX={2} marginTop={8} gap={2}>
              <Heading size="md">Signers</Heading>
            </Box>
          )}

          <Box padding={2}>
            <Table>
              <Table.Header>
                {assignees && assignees?.length > 0 && (
                  <Table.Row>
                    <Table.HeaderCell>
                      <Text weight="bold">Name</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">Email</Text>
                    </Table.HeaderCell>
                  </Table.Row>
                )}
              </Table.Header>
              <Table.Body>
                {assignees.map((user) => (
                  <Table.Row key={user.key}>
                    <Table.Cell>
                      <Text>{user.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{user.email}</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Box>
          {assignees && assignees?.length > 0 && (
            <Box padding={2}>
              <Button onClick={prepare} text="Continue" color="blue" inline />
            </Box>
          )}
          <Box
            fit
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
              },
            }}
            paddingX={1}
            position="fixed"
          >
            {showToast && <Snackbar text={"Please add at least one user"} />}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Assign;
