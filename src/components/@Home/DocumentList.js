import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { FRONTEND_URL } from "utils/constant/routeList";
import { Link } from "react-router-dom";
import { isImage } from "utils/validator";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    marginTop: "1rem",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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
                  {document?.title}
                </Typography>
              </Link>
              {isImage(document?.fileType) && (
                <img
                  src={document?.documentUrl}
                  style={{ maxWidth: "100%" }}
                  alt={document?.fileName}
                />
              )}

              <Typography variant="body2">{document?.description}</Typography>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default DocumentList;
