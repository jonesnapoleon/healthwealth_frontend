import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useData } from "contexts/DataContext";
import React from "react";
import { useParams } from "react-router";
import { getFrontendDateFormat } from "utils/transformer";

const useStyles = makeStyles({
  container: {
    width: "100%",
    margin: "1rem",
  },
  item: {
    width: "80%",
    margin: "1rem auto",
  },
  center: {
    textAlign: "center",
  },
  image: {
    width: "100%",
  },
  pt: {
    padding: "1rem",
  },
});

const DocumentDetail = () => {
  const { fileId } = useParams();
  const classes = useStyles();

  const { getDocumentData } = useData();
  const document = getDocumentData(fileId);

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid xs={12} lg={6}>
          <img
            src={document?.documentUrl}
            className={classes.image}
            alt={document?.fileName}
          />
        </Grid>
        <Grid xs={12} lg={6} className={classes.pt}>
          <Typography variant="h4" style={{ marginBottom: "1rem" }}>
            {document?.title}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "1rem" }}>
            {document?.description}
          </Typography>
          <Typography variant="body2">
            Uploaded at: {getFrontendDateFormat(document?.uploadedAt)}
          </Typography>
          <Typography variant="subtitle2">File ID: {document?.id}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default DocumentDetail;
