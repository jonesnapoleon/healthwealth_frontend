import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <div style={{ display: "grid", placeItems: "center", marginTop: "2rem" }}>
      <CircularProgress style={{ margin: "auto" }} size={80} />
    </div>
  );
};

export default Loading;
