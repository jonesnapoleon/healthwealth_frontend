import Account from "components/@Auth/Account";
import Auth from "components/@Auth";
import Home from "components/@Home";

import { FRONTEND_URL } from "./routeList";

export const routingComponent = [
  // MAIN NAV
  {
    path: FRONTEND_URL.account,
    component: Account,
  },
  {
    path: FRONTEND_URL.home,
    component: Home,
  },
  // AUTH
  {
    path: FRONTEND_URL.auth,
    component: Auth,
  },
  {
    path: "*",
    component: Home,
  },
];
