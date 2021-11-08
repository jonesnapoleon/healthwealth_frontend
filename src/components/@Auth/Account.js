import React from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useSnackbar } from "contexts/SnackbarContext";
import { useAuth } from "contexts/AuthContext";
import { useFormInput } from "utils/hooks";
import "./index.scss";
import { editAccount } from "api/auth";

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
    signOut,
    editProfile,
  } = useAuth();

  const fullName = useFormInput(user?.fullName);
  const email = useFormInput(user?.email);

  return (
    <div className="account-page">
      <div className={"left"}>
        <div className={classes.container}>
          <TextField
            {...fullName}
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
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={async () => await editProfile(fullName.value, email.value)}
          >
            Edit
          </Button>
        </>
      </div>

      <div className="right">
        <div>
          <Button
            className={"sign-out-button"}
            color="primary"
            variant="outlined"
            onClick={signOut}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
