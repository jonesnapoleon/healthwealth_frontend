import Account from "components/@Account";
import Auth from "components/@Auth";
import Home from "components/@Home";

import { FRONTEND_URL } from "./routeList";

export const routingComponent = [
  // MAIN NAV
  {
    path: FRONTEND_URL.home,
    component: Home,
  },
  {
    path: FRONTEND_URL.account,
    component: Account,
  },
  // AUTH
  {
    path: FRONTEND_URL.auth,
    component: Auth,
  },
];
