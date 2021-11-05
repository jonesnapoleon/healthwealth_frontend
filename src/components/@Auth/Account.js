import React from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useSnackbar } from "contexts/SnackbarContext";
import { useAuth } from "contexts/AuthContext";
import { useFormInput } from "utils/hooks";
import "./index.scss";
import { editAccount } from "api/auth";

const logo = "https://cdn.worldvectorlogo.com/logos/tokopedia.svg";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  item: {
    width: "80%",
    margin: "1rem 10%",
  },
  center: {
    textAlign: "center",
  },
});

const Account = () => {
  const classes = useStyles();
  const {
    auth: { user },
  } = useAuth();

  const { addSnackbar } = useSnackbar();
  const full_name = useFormInput(user?.full_name);
  const email = useFormInput(user?.email);

  const edit = async () => {
    try {
      const finalData = { full_name: full_name?.value, email: email?.value };
      const res = await editAccount(finalData);
      console.log(res);
    } catch (e) {
      addSnackbar(String(e));
    }
  };

  return (
    <div className="account-page">
      <div className={classes.container}>
        <TextField
          {...full_name}
          label="Full name"
          variant="outlined"
          // className={classes.item}
        />
        <TextField
          {...email}
          label="Email"
          variant="outlined"
          // className={classes.item}
        />
      </div>
      <>
        <Button color="primary" variant="contained" size="large" onClick={edit}>
          Edit
        </Button>
      </>
    </div>
  );
};

export default Account;
