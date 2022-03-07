import React, { useState } from "react";
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { DesktopDatePicker } from "@mui/lab";
import { BASELINE_DATE } from "utils/constant";
import { useFile, useFormInput, useInput } from "utils/hooks";
import { convertCamelCase } from "utils/transformer";

import { uploadFile } from "api/data";
import { useSnackbar } from "contexts/SnackbarContext";

const DOCUMENT_CATEGORY_CHOICES = [
  "Lab result",
  "Health recipe",
  "Health certificate",
];

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    marginTop: "1rem",
    flexWrap: "wrap",
    position: "relative",
  },
  item: {
    width: "80%",
    margin: "1rem auto",
  },
});

const AddDocument = ({ appendDocument, closeDrawer }) => {
  const classes = useStyles();

  const title = useFormInput("");
  const description = useFormInput("");
  const issuerName = useFormInput("");
  const issuedDate = useInput(BASELINE_DATE);
  const fileData = useFile();
  const category = useFormInput("");

  const [loading, setLoading] = useState(false);

  const { addSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      setLoading(true);
      if (!fileData.file) throw new Error("No file uploaded");
      if (title.value.trim() === "") throw new Error("Title cannot be empty");
      const res = await uploadFile(
        fileData.file,
        title.value,
        description.value,
        issuerName.value,
        issuedDate.value,
        category.value
      );
      if (res) {
        appendDocument(res);
        addSnackbar("Document successfully uploaded", "success");
      }
    } catch (e) {
      addSnackbar(String(e));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={classes.container}>
      <CloseIcon
        style={{
          position: "absolute",
          right: ".6rem",
          top: ".1rem",
        }}
        onClick={closeDrawer}
      />

      <div style={{ width: "100%", margin: "1rem 0 2rem" }}>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          New Document
        </Typography>
      </div>

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
        {...title}
        label={convertCamelCase("title")}
        variant="outlined"
        className={classes.item}
      />
      <TextField
        {...description}
        label={convertCamelCase("description")}
        variant="outlined"
        className={classes.item}
        multiline
        maxRows={3}
      />
      <TextField
        select
        label={convertCamelCase("documentCategory")}
        {...category}
        className={classes.item}
        variant="outlined"
      >
        {DOCUMENT_CATEGORY_CHOICES.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </TextField>

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
        disabled={loading}
      >
        Add document
      </Button>
    </div>
  );
};

export default AddDocument;
