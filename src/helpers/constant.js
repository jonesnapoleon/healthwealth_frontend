export const AUTH_KEY = process.env.LOCAL_STORAGE_AUTH ?? "auth_dev";
export const BREAKPOINT_WIDTH = 769;
export const MODAL_ANIMATE_DURATION = 800;

export const DOC = {
  me: "me",
  all: "all",
  request: "request",
  document: "document",
};

export const FRONTEND_URL = {
  realBase: "/",
  base: "/sign",
  login: "/login",
  sign: "/sign",
  me: `/${DOC.me}`,
  all: `/${DOC.all}`,
  request: `/${DOC.request}`,
  document: `/${DOC.document}`,
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

export const DRAFT_STATUS = {
  DRAFTING: "DRAFTING",
  WAITING: "WAITING",
  OUT: "OUT",
  COMPLETED: "COMPLETED",
};

export const publicLinks = [FRONTEND_URL.privacyPolicy];

export const highlightedNavs = [
  FRONTEND_URL.me,
  FRONTEND_URL.all,
  FRONTEND_URL.request,
  FRONTEND_URL.document,
];

export const PROGRESS_BAR_INTERVAL = 30;

export const FIXED_COLORS = [
  { color: "red", backgroundColor: "rgba(255, 0, 0, 0.6)" },
  { color: "blue", backgroundColor: "rgba(0, 0, 255, 0.6)" },
  { color: "yellow", backgroundColor: "rgba(255, 255, 0, 0.6)" },
  { color: "green", backgroundColor: "rgba(0, 255, 0, 0.6)" },
  { color: "pink", backgroundColor: "rgba(213, 21, 13, 0.6)" },
];

export const FONTLIST = [
  ["BeautifulBloom", "BeautifulBloom"],
  ["Biancha", "Biancha"],
  ["Dessthia", "Dessthia"],
  ["Elaine", "Elaine"],
  ["Hendrickson", "Hendrickson"],
  ["Hudson", "Hudson"],
  ["KingWaller", "KingWaller"],
  ["SignatureMoments", "SignatureMoments"],
  ["SignatureX", "SignatureX"],
  ["Signeria", "Signeria"],
  ["Singaporean", "Singaporean"],
  ["Standlist", "Standlist"],
];

export const SCALE = [50, 75, 100, 125];

export const SIGNING_ACTIVE_FIXED_ITEM = {
  me: 1,
  all: 2,
  request: 2,
};
