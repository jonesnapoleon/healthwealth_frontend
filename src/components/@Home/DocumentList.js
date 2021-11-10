import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { getFrontendDateFormat } from "utils/transformer";
import { FRONTEND_URL } from "utils/constant/routeList";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    marginTop: "1rem",
    flexWrap: "wrap",
  },
  item: {
    // width: "80%",
    margin: "1rem auto",
  },
  center: {
    textAlign: "center",
  },
});
const DocumentList = ({ documents }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {documents &&
          documents?.map((document) => (
            <Grid
              item
              key={document?.id}
              xs={12}
              lg={6}
              className={classes.item}
            >
              <Link
                to={`${FRONTEND_URL.document}/${document?.id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bolder" }}
                  color="primary"
                >
                  {document?.fileName}
                </Typography>
              </Link>
              <Typography variant="body2">{document?.description}</Typography>
              <Typography variant="body2">
                Uploaded at: {getFrontendDateFormat(document?.uploadedAt)}
              </Typography>
              <Typography variant="subtitle2">
                File ID: {document?.id}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default DocumentList;
