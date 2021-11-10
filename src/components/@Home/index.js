import React from "react";
import { useData } from "contexts/DataContext";
import { Grid, Typography } from "@material-ui/core";

import "./index.scss";
import AddDocument from "./AddDocument";
import DocumentList from "./DocumentList";

const Home = () => {
  const { documents, appendDocument } = useData();

  return (
    <div className="dashboard-page">
      <div className="wrapper">
        <Grid container spacing={2}>
          <Grid item xs={8} style={{ background: "rgba(255, 255, 255, 0.3)" }}>
            <Typography variant="h1">Your secured documents</Typography>
            <DocumentList documents={documents} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Add Document
            </Typography>
            <AddDocument appendDocument={appendDocument} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
