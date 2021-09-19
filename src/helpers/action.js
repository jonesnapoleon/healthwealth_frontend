export const openWA = (wa, name, place1, place2, finalUrl) => {
  window.open(
    `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      wa
    )}&text=${encodeURIComponent(place1)}%20${encodeURIComponent(
      name
    )}%20${encodeURIComponent(place2)}%20${finalUrl}`
  );
};
