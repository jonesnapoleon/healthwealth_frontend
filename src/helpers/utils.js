export const setQueryStringWithoutReload = (qs) => {
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qs}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
};
