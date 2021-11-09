import React, { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FRONTEND_URL } from "utils/constant/routeList";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PersonIcon from "@material-ui/icons/Person";

import logo from "../../assets/images/logo.jpg";

const useStyles = makeStyles({
  wrapper: {
    height: "80px",
    // marginTop: "48px",
  },
  root: {
    height: "80px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    background: "white",
    position: "fixed",
    top: 0,
    zIndex: "999",
    boxShadow: "0px -1px 15px rgba(200, 200, 200, 0.75)",
    marginBottom: ".2rem",
  },
  action: {
    padding: "0rem",
    width: "25%",
    minWidth: "unset",
  },
  logo: {
    width: "auto",
    height: "1.2rem",
  },
});

const navigationData = [
  {
    label: "",
    navigateTo: FRONTEND_URL.home,
    icon: (
      <img
        src={logo}
        alt=""
        className={"logo"}
        style={{
          width: "90%",
        }}
      />
    ),
    // icon: <HomeIcon />,
  },
  // {
  //   label: "Feed",
  //   navigateTo: FRONTEND_URL.feed,
  //   icon: <FiberNewIcon />,
  // },
  // {
  //   label: "Official Store",
  //   navigateTo: FRONTEND_URL.officialStore,
  //   icon: <StorefrontIcon />,
  // },
  // {
  //   label: "Keranjang",
  //   navigateTo: FRONTEND_URL.cart,
  //   icon: <AddShoppingCartIcon />,
  // },
  {
    label: "Account",
    navigateTo: FRONTEND_URL.account,
    icon: <PersonIcon />,
  },
];

export default function TopNavigation() {
  const classes = useStyles();

  const location = useLocation();

  const navigationIndex = useMemo(() => {
    const currentParam = location.pathname;
    return navigationData.findIndex((data) => data.navigateTo === currentParam);
  }, [location.pathname]);

  const [value, setValue] = useState(navigationIndex);
  const history = useHistory();

  if (
    location?.pathname === FRONTEND_URL.auth ||
    location?.pathname === `${FRONTEND_URL.auth}/`
  )
    return <></>;

  return (
    <div className={classes.wrapper}>
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          history.push(navigationData[newValue].navigateTo);
        }}
        showLabels
        className={classes.root}
      >
        {navigationData.map((data, i) => (
          <BottomNavigationAction
            label={data.label}
            icon={data.icon}
            key={data.navigateTo}
            className={classes.action}
            style={i === 0 ? { padding: "0 1.1rem" } : {}}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}
