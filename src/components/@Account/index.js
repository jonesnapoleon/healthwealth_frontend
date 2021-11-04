import React from "react";
// import MainNavigation from "components/Skeleton/MainNavigation";
import BottomNavigation from "components/Skeleton/BottomNavigation";
import TopBar from "components/Skeleton/TopBar";
import { useAuth } from "contexts/AuthContext";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    boxShadow: "none",
    padding: ".4rem .4rem 1rem",
  },
  img: {
    width: "100%",
  },
});

const img = "https://miro.medium.com/max/2000/1*kbg7sThKW06vBNTD0ZMclA.jpeg";

const Account = () => {
  const { auth, signOut } = useAuth();
  const classes = useStyles();

  return (
    <div>
      <TopBar />
      <div className={classes.wrapper}>
        <Typography variant="h2" color="textPrimary">
          Profile
        </Typography>
        <div className="item-start">
          <div>
            <Avatar src={auth?.user_detail?.user_logo} />
          </div>
          <div>
            <Typography variant="body1" color="textPrimary">
              <strong>{auth?.user_detail?.name}</strong>
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Saldo: <strong>Rp{auth?.user_detail?.user_balance}</strong>
            </Typography>
          </div>
        </div>
        <div>
          <Button onClick={signOut} variant="outlined" color="primary">
            Sign out
          </Button>
        </div>
      </div>

      <div className={classes.wrapper}>
        <Typography variant="h2" color="textPrimary">
          Daftar Transaksi
        </Typography>
        <div>
          <div>
            <img src={img} alt="" className={classes.img} />
          </div>
          <div>
            <Typography variant="h5" color="textPrimary" align="center">
              Halaman sedang dibangun
            </Typography>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Account;
