import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Heading,
  TextField,
  Table,
  Text,
  IconButton,
  Popover,
  Toast,
  Icon,
  Switch,
  Label,
} from "gestalt";
import "gestalt/dist/gestalt.css";
import { setUploadedFile, uploadedFile } from "./AssignSlice";
import Snackbar from "../commons/Snackbar";
import WebViewer from "@pdftron/webviewer";
import DragDrop from "../commons/DragDrop";
import "./Assign.css";

const UploadDocument = () => {
  const [showToast, setShowToast] = useState(false);
  const [open, setOpen] = useState(false);
  const file = useSelector(uploadedFile);

  const dispatch = useDispatch();
  const filePicker = useRef(null);
  const anchorRef = useRef(null);

  useEffect(() => {
    filePicker.current.onchange = (e) => {
      const newFile = e.target.files[0];
      if (newFile) dispatch(setUploadedFile(newFile));
    };
  }, [dispatch]);

  const handleDrop = (file) => {
    if (file) dispatch(setUploadedFile(file));
  };

  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={2}>
            <Heading size="md">What needs to be signed?</Heading>
          </Box>
          <Box padding={2} marginTop={8} gap={2}>
            <Heading size="sm">Select document</Heading>
          </Box>
          <Box
            padding={2}
            color="lightGray"
            height="20vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <div id="drag-drop-icon-button">
              <DragDrop handleDrop={handleDrop}>
                <IconButton
                  accessibilityLabel="Default IconButton"
                  icon="share"
                  size="xl"
                  iconColor="darkGray"
                  onClick={() => {
                    if (filePicker) {
                      filePicker.current.click();
                    }
                  }}
                />
                <Text weight="bold">Drag and drop file or click to upload</Text>
                <input
                  type="file"
                  ref={filePicker}
                  style={{ display: "none" }}
                />
              </DragDrop>
            </div>
          </Box>

          {file && (
            <>
              <Box paddingX={2} marginTop={8} gap={2}>
                <Heading size="sm">Documents you've selected</Heading>
                <Text>Tap to copy</Text>
              </Box>
              <Box paddingX={2} marginTop={0}>
                <Box marginEnd={1} padding={1} inline>
                  <Popover
                    anchor={anchorRef.current}
                    idealDirection="down"
                    onDismiss={() => setOpen(false)}
                    positionRelativeToAnchor={false}
                    size="xl"
                  >
                    <IconButton
                      accessibilityLabel="Pin"
                      icon="drag-drop"
                      iconColor="darkGray"
                      onClick={() => {}}
                      inline
                    />
                  </Popover>
                </Box>
                <Text paddingX={2} weight="bold">
                  https
                </Text>
              </Box>
            </>
          )}
          {showToast && <Snackbar text={"Upload fail"} />}
        </Container>
      </Box>
    </div>
  );
};

export default UploadDocument;
