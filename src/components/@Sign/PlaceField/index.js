import React, { useRef, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { navigate } from "@reach/router";
import { Box, Column, Heading, Row, Stack, Button } from "gestalt";
// import { selectDocToView } from "./ViewDocumentSlice";
// import { storage } from '../../firebase/firebase';
import WebViewer from "@pdftron/webviewer";
import { useData } from "../../../contexts/DataContext";
import { useAuth } from "../../../contexts/AuthContext";

const PlaceField = () => {
  const [instance, setInstance] = useState(null);
  const { auth } = useAuth();

  const { fileUrl } = useData();
  //   const doc = useSelector(selectDocToView);

  //   const { docRef } = doc;

  const viewer = useRef(null);

  console.log(fileUrl);

  useEffect(() => {
    if (typeof fileUrl === "string")
      WebViewer(
        {
          path: "webviewer",
          disabledElements: [
            "ribbons",
            "toggleNotesButton",
            "contextMenuPopup",
          ],
        },
        viewer.current
      ).then(async (instance) => {
        // select only the view group
        instance.loadDocument(fileUrl, {
          filename: "myfile.pdf",
          customHeaders: {
            Authorization: `Bearer ${auth?.id_token}`,
          },
          withCredentials: true,
        });

        instance.setToolbarGroup("toolbarGroup-View");

        setInstance(instance);

        // load document
        // const storageRef = storage.ref();
        // const URL = await storageRef.child(docRef).getDownloadURL();
        // console.log(URL);
        // instance.docViewer.loadDocument(URL);
      });
  }, [fileUrl]);

  const download = () => {
    instance.downloadPdf(true);
  };

  const doneViewing = async () => {
    // navigate("/");
    console.log("d");
  };

  return (
    <div className={"prepareDocument"}>
      <Box display="flex" direction="row" flex="grow">
        <Column span={2}>
          <Box padding={3}>
            <Heading size="md">View Document</Heading>
          </Box>
          <Box padding={3}>
            <Row gap={1}>
              <Stack>
                <Box padding={2}>
                  <Button
                    onClick={download}
                    accessibilityLabel="download signed document"
                    text="Download"
                    iconEnd="download"
                  />
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={doneViewing}
                    accessibilityLabel="complete signing"
                    text="Done viewing"
                    iconEnd="check"
                  />
                </Box>
              </Stack>
            </Row>
          </Box>
        </Column>
        <Column span={10}>
          <div className="webviewer" ref={viewer}></div>
        </Column>
      </Box>
    </div>
  );
};

export default PlaceField;
