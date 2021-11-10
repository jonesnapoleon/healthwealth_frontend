import React from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useAuth } from "contexts/AuthContext";
import { useInput, useMultipleFormInput } from "utils/hooks";
import { convertCamelCase, getBackendDateFormat } from "utils/transformer";
import "./index.scss";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { BASELINE_DATE } from "utils/constant";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    marginTop: "2rem",
    flexWrap: "wrap",
  },
  item: {
    width: "30%",
    margin: "1rem 2% 1rem 0",
  },
  center: {
    textAlign: "center",
  },
});

const dateSet = new Set(["birthDate"]);

const multilineSet = new Set(["address"]);

const Account = () => {
  const classes = useStyles();
  const {
    auth: { user },
    signOut,
    editProfile,
  } = useAuth();

  const { data, handleChange } = useMultipleFormInput(user);

  const birthDate = useInput(BASELINE_DATE, new Date(user?.birthDate));

  return (
    <div className="account-page">
      <div className={"left"}>
        <Typography variant={"h1"}>Your profile</Typography>
        <div className={classes.container}>
          {data &&
            Object.entries(data)?.map(([key, value]) => {
              console.log(multilineSet.has(key), key);
              return (
                !dateSet.has(key) && (
                  <TextField
                    key={key}
                    value={value}
                    onChange={handleChange}
                    label={convertCamelCase(key)}
                    name={key}
                    multiline={multilineSet.has(key) ? true : false}
                    maxRows={3}
                    variant="outlined"
                    className={classes.item}
                  />
                )
              );
            })}
          {
            <DesktopDatePicker
              label={convertCamelCase("birthDate")}
              inputFormat="yyyy-MM-dd"
              {...birthDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  className={classes.item}
                />
              )}
            />
          }
        </div>
        <>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={async () =>
              await editProfile({
                ...data,
                birthDate: getBackendDateFormat(birthDate.value),
              })
            }
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
