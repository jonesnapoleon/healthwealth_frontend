import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Heading, Text, IconButton } from "gestalt";
import "gestalt/dist/gestalt.css";
import { uploadedFile } from "./AssignSlice";
import Snackbar from "../commons/Snackbar";
import DragDrop from "../commons/DragDrop";
import "./Assign.css";

const UploadDocument = ({ setAvailableLevel }) => {
  const [snackbarData, setSnackbarData] = useState({ open: false });
  const [file, setFile] = useState(false);
  const fileUrl = useSelector(uploadedFile);

  const dispatch = useDispatch();
  const filePicker = useRef(null);

  useEffect(() => {
    filePicker.current.onchange = (e) => {
      const newFile = e.target.files[0];
      if (newFile) setFile(newFile);
      else setSnackbarData({ open: true, text: "Upload file failed" });
    };
  }, [dispatch]);

  useEffect(() => {
    if (fileUrl !== null) dispatch(setAvailableLevel(1));
  }, [fileUrl, dispatch, setAvailableLevel]);

  const handleDrop = (file) => {
    console.log(file);
    if (file) setFile(file);
    else setSnackbarData({ open: true, text: "Upload file failed" });
  };

  const copyToClipboard = () => {
    const body = document.getElementsByTagName("body")[0];
    let tempInput = document.createElement("input");
    body.appendChild(tempInput);
    tempInput.setAttribute("value", fileUrl);
    tempInput.select();
    document.execCommand("copy");
    body.removeChild(tempInput);
    setSnackbarData({
      open: true,
      text: "Copied to clipboard",
      type: "primary",
    });
    setTimeout(() => setSnackbarData({ open: false }), 1000);
  };

  return (
    <>
      <Box padding={3}>
        <Container>
          <Box padding={2}>
            <Heading size="md">What needs to be signed?</Heading>
          </Box>
          <Box padding={2} marginTop={8} gap={2}>
            <Heading size="sm">Select document</Heading>
          </Box>
          <Box padding={2} color="lightGray" fit>
            <div id="drag-drop-icon-button">
              <DragDrop handleDrop={handleDrop}>
                <IconButton
                  accessibilityLabel="Default IconButton"
                  icon="share"
                  size="xl"
                  bgColor="darkGray"
                  iconColor="white"
                  onClick={() => {
                    if (filePicker) {
                      filePicker.current.click();
                    }
                  }}
                />
                <Text weight="bold" align="center">
                  {file && file?.name
                    ? "Reupload to change file"
                    : "Drag and drop file or tap icon to upload"}
                </Text>
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
                <Text>{file?.name}</Text>
              </Box>
              <Box
                paddingX={2}
                marginTop={0}
                display="flex"
                alignItems="center"
              >
                <Box paddingX={2} marginTop={0} display="inlineBlock">
                  {fileUrl && (
                    <IconButton
                      accessibilityLabel="Pin"
                      size="xl"
                      icon="canonical-pin"
                      iconColor="darkGray"
                      inline
                      onClick={copyToClipboard}
                    />
                  )}
                </Box>

                <Box
                  fit
                  as={"section"}
                  dangerouslySetInlineStyle={{
                    __style: {
                      borderBottom: "4px solid var(--primary-color)",
                    },
                  }}
                  paddingY={1}
                  marginTop={4}
                  display="inlineBlock"
                  borderStyle="shadow"
                >
                  <Text
                    size="lg"
                    paddingX={2}
                    weight="bold"
                    inline
                    underline={true}
                    overflowX={"auto"}
                  >
                    {fileUrl}
                  </Text>
                </Box>
              </Box>
            </>
          )}
          {snackbarData?.open && (
            <Snackbar text={snackbarData?.text} color={snackbarData?.color} />
          )}
        </Container>
      </Box>
    </>
  );
};

export default UploadDocument;
