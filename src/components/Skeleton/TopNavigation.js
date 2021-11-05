import React, { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FRONTEND_URL } from "utils/constant/routeList";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StorefrontIcon from "@material-ui/icons/Storefront";
import PersonIcon from "@material-ui/icons/Person";
import FiberNewIcon from "@material-ui/icons/FiberNew";

const useStyles = makeStyles({
  wrapper: {
    height: "80px",
    // marginTop: "48px",
  },
  root: {
    height: "80px",
    width: "100%",
    position: "fixed",
    top: 0,
    boxShadow: "0px -1px .5px rgba(200, 200, 200, 0.75)",
    marginBottom: ".2rem",
  },
  action: {
    padding: "0rem",
    width: "20%",
    minWidth: "unset",
  },
});

const navigationData = [
  {
    label: "Home",
    navigateTo: FRONTEND_URL.home,
    icon: <HomeIcon />,
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
        {navigationData.map((data) => (
          <BottomNavigationAction
            label={data.label}
            icon={data.icon}
            key={data.navigateTo}
            className={classes.action}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}
