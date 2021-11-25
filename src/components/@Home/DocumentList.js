import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { FRONTEND_URL } from "utils/constant/routeList";
import { Link } from "react-router-dom";
import { isImage } from "utils/validator";
import { Chip } from "../../../node_modules/@material-ui/core/index";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    marginTop: "1rem",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  item: {
    margin: "1rem auto",
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
              {isImage(document?.fileType) && (
                <img
                  src={document?.documentUrl}
                  style={{ maxWidth: "100%" }}
                  alt={document?.fileName}
                />
              )}

              <Link
                to={`${FRONTEND_URL.document}/${document?.id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bolder" }}
                  color="primary"
                >
                  {document?.title}
                </Typography>
              </Link>
              <Typography variant="body1">
                Owner: {document?.uploadedBy}
              </Typography>
              <Chip label={document?.category} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default DocumentList;
