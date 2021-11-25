import React, { useState } from "react";
import { useData } from "contexts/DataContext";
import { Typography } from "@material-ui/core";

import "./index.scss";
import AddDocument from "./AddDocument";
import DocumentList from "./DocumentList";
import { Box, Button, SwipeableDrawer } from "@material-ui/core";
import { useWidth } from "utils/hooks";

const Home = () => {
  const { documents, appendDocument } = useData();
  const { isLargeScreen, width } = useWidth();

  const [isAddDocumentDrawerOpen, setIsAddDocumentDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setIsAddDocumentDrawerOpen(open);
  };
  return (
    <div className="dashboard-page">
      <div className="wrapper">
        <Typography variant="h1">
          Your Secured Health{" "}
          {documents && documents?.length > 0 ? "Documents" : "App"}
        </Typography>
        {documents && documents?.length > 0 ? (
          <DocumentList documents={documents} />
        ) : (
          <Typography variant="body1" style={{ marginTop: "2rem" }}>
            You have no health document.{" "}
            <Typography
              display="inline"
              color="primary"
              onClick={() => setIsAddDocumentDrawerOpen(true)}
              style={{ cursor: "pointer" }}
            >
              Add now!
            </Typography>
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          className={isLargeScreen ? "add-document-button" : "margin-top"}
          onClick={toggleDrawer(true)}
        >
          Add Document
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={isAddDocumentDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{
              width: width > 400 ? 400 : width,
            }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
          >
            <AddDocument
              appendDocument={appendDocument}
              closeDrawer={toggleDrawer(false)}
            />
          </Box>
        </SwipeableDrawer>
      </div>
    </div>
  );
};

export default Home;
