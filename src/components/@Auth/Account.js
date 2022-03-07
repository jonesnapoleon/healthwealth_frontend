import React, { useState } from "react";
import {
  Grid,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useAuth } from "contexts/AuthContext";
import { useInput, useMultipleFormInput, useWidth } from "utils/hooks";
import { convertCamelCase, getBackendDateFormat } from "utils/transformer";
import "./index.scss";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { BASELINE_DATE } from "utils/constant";

const useStyles = makeStyles({
  container: {
    width: "100%",
    marginTop: "1rem",
  },
  marginContainer: {
    padding: "0 2% 0 0",
  },
  item: {
    margin: "1rem 2% 1rem 0",
    width: "100%",
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

  const [loading, setLoading] = useState(false);
  const { isLargeScreen } = useWidth();

  const birthDate = useInput(BASELINE_DATE, new Date(user?.birthDate));

  return (
    <div className="account-page">
      <div className={"wrapper"}>
        <div className={"left"}>
          <Typography variant={"h1"}>Your profile</Typography>
          <div className={classes.container}>
            <Grid container>
              {data &&
                Object.entries(data)?.map(([key, value]) => {
                  return (
                    !dateSet.has(key) && (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        xl={3}
                        className={classes.marginContainer}
                      >
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
                      </Grid>
                    )
                  );
                })}
              <Grid
                item
                xs={12}
                md={6}
                xl={4}
                className={classes.marginContainer}
              >
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
              </Grid>
            </Grid>
          </div>
          <>
            <Button
              color="primary"
              variant="contained"
              size="large"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                await editProfile(
                  {
                    ...data,
                    birthDate: getBackendDateFormat(birthDate.value),
                  },
                  () => setLoading(false)
                );
              }}
            >
              Edit
            </Button>
          </>
        </div>

        <Button
          className={`${isLargeScreen ? "sign-out-button" : "margin-top"}`}
          color="primary"
          variant="outlined"
          onClick={signOut}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Account;
