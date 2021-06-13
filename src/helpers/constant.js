export const AUTH_KEY = process.env.LOCAL_STORAGE_AUTH ?? "auth_dev";
export const BREAKPOINT_WIDTH = 769;
export const MODAL_ANIMATE_DURATION = 800;

export const FRONTEND_URL = {
  realBase: "/",
  base: "/sign",
  login: "/login",
  me: "/me",
  all: "/all",
  sign: "/sign",
  settings: "/settings",
  docs: "/docs",
  privacyPolicy: "/privacy-policy",
};

export const publicLinks = [FRONTEND_URL.privacyPolicy];

export const highlightedNavs = [FRONTEND_URL.me, FRONTEND_URL.all];
export const PROGRESS_BAR_INTERVAL = 30;
