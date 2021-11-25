import { Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import { useData } from "contexts/DataContext";
import React from "react";
import { useParams } from "react-router";
import { useWidth } from "utils/hooks";
import { getFrontendDateFormat } from "utils/transformer";
import { isImage } from "utils/validator";
import GrantAccess from "./GrantAccess";
import PDFViewer from "./PDFViewer";

const useStyles = makeStyles({
  container: {
    margin: "2vh 2vw",
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

  const { isLargeScreen } = useWidth();
  const { getDocumentData } = useData();
  const document = getDocumentData(fileId);

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12} lg={6}>
          {isImage(document?.fileType) ? (
            <img
              src={document?.documentUrl}
              className={classes.image}
              alt={document?.fileName}
            />
          ) : (
            <PDFViewer fileUrl={document?.documentUrl} />
          )}
        </Grid>

        <Grid item xs={12} lg={6} className={isLargeScreen ? classes.pt : {}}>
          <Typography variant="h1" style={{ marginBottom: "1rem" }}>
            {document?.title}
          </Typography>
          <Chip
            label={document?.category}
            color="primary"
            style={{ marginBottom: "1rem" }}
          />

          <Typography variant="subtitle2">
            Uploaded at: {getFrontendDateFormat(document?.uploadedAt)}
          </Typography>
          <Typography variant="subtitle2">
            Issued at: {getFrontendDateFormat(document?.issueddate)}
          </Typography>
          <Typography variant="subtitle2">
            Issued by: {document?.issuername}
          </Typography>

          <Typography variant="subtitle2" style={{ marginBottom: "1rem" }}>
            File ID: {document?.id}
          </Typography>

          <Typography variant="body1">{document?.description}</Typography>
        </Grid>
      </Grid>
      <GrantAccess documentId={document?.id} />
    </div>
  );
};

export default DocumentDetail;
