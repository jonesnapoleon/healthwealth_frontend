import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getDocumentList } from "api/data";
import { useSnackbar } from "contexts/SnackbarContext";
import { useData } from "contexts/DataContext";
import { Typography } from "@material-ui/core";

import "./index.scss";

const Home = () => {
  const { data, error } = useQuery("getDocumentList", getDocumentList);
  const { addSnackbar } = useSnackbar();
  const { documents, setDocuments } = useData();

  useEffect(() => {
    if (error) addSnackbar(error);
  }, [error, addSnackbar]);

  useEffect(() => {
    if (data) setDocuments(data);
  }, [data, setDocuments]);

  return (
    <div className="dashboard-page">
      <div className="wrapper">
        <Typography variant="h1" color="textPrimary">
          Dokumen pentingmu
        </Typography>
        <div className="flex-wrap"></div>
      </div>
    </div>
  );
};

export default Home;
