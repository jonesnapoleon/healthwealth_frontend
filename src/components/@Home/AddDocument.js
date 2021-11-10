import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { DesktopDatePicker } from "@mui/lab";
import React from "react";
import { BASELINE_DATE } from "utils/constant";
import { useFile, useFormInput, useInput } from "utils/hooks";
import { convertCamelCase } from "utils/transformer";

import { uploadFile } from "api/data";
import { useSnackbar } from "contexts/SnackbarContext";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    marginTop: "1rem",
    flexWrap: "wrap",
  },
  item: {
    width: "80%",
    margin: "1rem auto",
  },
  center: {
    textAlign: "center",
  },
});

const AddDocument = ({ appendDocument }) => {
  const classes = useStyles();

  const description = useFormInput("");
  const issuerName = useFormInput("");
  const issuedDate = useInput(BASELINE_DATE);
  const fileData = useFile();

  const { addSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      if (!fileData.file) throw new Error("No file uploaded");
      const res = await uploadFile(
        fileData.file,
        description.value,
        issuerName.value,
        issuedDate.value
      );
      if (res) {
        appendDocument(res);
        addSnackbar("Document successfully uploaded", "success");
      }
    } catch (e) {
      addSnackbar(String(e));
    }
  };
  return (
    <div className={classes.container}>
      <Button
        variant={"outlined"}
        color={fileData.file ? "secondary" : "primary"}
        component="label"
        className={classes.item}
        style={{
          marginBottom: "0.5rem",
          paddingTop: ".7rem",
          paddingBottom: ".7rem",
        }}
      >
        <Typography
          variant={"body2"}
          style={{
            textTransform: "capitalize",
          }}
        >
          {!fileData.file ? "Upload File" : "Uploaded"}
        </Typography>
        <input type="file" hidden ref={fileData?.filePicker} />
      </Button>
      {fileData?.file && (
        <>
          <div
            className={classes.item}
            style={{
              marginTop: "0",
              display: "grid",
              placeItems: "center",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <span>
              <Typography
                color="primary"
                variant="subtitle"
                style={{
                  verticalAlign: "center",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textAlign: "left",
                  maxWidth: "100%",
                }}
              >
                {fileData?.file?.name}
              </Typography>
            </span>
          </div>
        </>
      )}

      <TextField
        {...description}
        label={convertCamelCase("Description")}
        variant="outlined"
        className={classes.item}
        multiline
        maxRows={3}
      />
      <TextField
        {...issuerName}
        label={convertCamelCase("issuerName")}
        variant="outlined"
        className={classes.item}
      />
      <DesktopDatePicker
        label={convertCamelCase("issuerDate")}
        inputFormat="yyyy-MM-dd"
        {...issuedDate}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" className={classes.item} />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.item}
        style={{
          paddingTop: ".7rem",
          paddingBottom: ".7rem",
        }}
        onClick={handleClick}
      >
        Add document
      </Button>
    </div>
  );
};

export default AddDocument;
