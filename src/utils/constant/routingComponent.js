import Account from "components/@Auth/Account";
import Auth from "components/@Auth";
import Home from "components/@Home";

import { FRONTEND_URL } from "./routeList";
import DocumentDetail from "components/@Home/Document/DocumentDetail";

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
  {
    path: FRONTEND_URL.documentDetail,
    component: DocumentDetail,
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
