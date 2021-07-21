export const AUTH_KEY = process.env.LOCAL_STORAGE_AUTH ?? "auth_dev";
export const BREAKPOINT_WIDTH = 769;
export const MODAL_ANIMATE_DURATION = 800;

export const DOC = {
  me: "me",
  all: "all",
  request: "request",
  usersign: "usersign",
};

export const FRONTEND_URL = {
  realBase: "/",
  base: "/sign",
  login: "/login",
  sign: "/sign",
  me: `/${DOC.me}`,
  all: `/${DOC.all}`,
  request: `/${DOC.request}`,
  usersign: `/${DOC.usersign}`,
  settings: "/settings",
  docs: "/docs",
  privacyPolicy: "/privacy-policy",
  sign_selected_document: "#selected-document",
  sign_add_signers: "#add-signers",
  sign_place_fields: "#place-fields",
  sign_review_send: "#review-send",
};

export const ADDSIGNER = {
  SIGN: "SIGN",
  REVIEW: "REVIEW",
};

export const publicLinks = [FRONTEND_URL.privacyPolicy];

export const highlightedNavs = [
  FRONTEND_URL.me,
  FRONTEND_URL.all,
  FRONTEND_URL.request,
  FRONTEND_URL.usersign,
];

export const PROGRESS_BAR_INTERVAL = 30;

export const FIXED_COLORS = [
  { color: "red", backgroundColor: "rgba(255, 0, 0, 0.6)" },
  { color: "blue", backgroundColor: "rgba(0, 0, 255, 0.6)" },
  { color: "yellow", backgroundColor: "rgba(255, 255, 0, 0.6)" },
  { color: "green", backgroundColor: "rgba(0, 255, 0, 0.6)" },
  { color: "pink", backgroundColor: "rgba(213, 21, 13, 0.6)" },
];
