import React from "react";
import { useTranslation } from "react-i18next";

// const src =
//   "https://lh3.googleusercontent.com/a/AATXAJx1LiuKljmJO8H4h1gOlUI3V5VIF2Jo7NJQNcTz=s96-c";

const StaticPersonRow = ({ data, index, handleValue }) => {
  return (
    <>
      <div className="col-6">
        <input
          value={data?.name}
          onChange={(e) => handleValue("name", e.target.value, index)}
        />
      </div>
      <div className="col-6">
        <input
          value={data?.email}
          onChange={(e) => handleValue("email", e.target.value, index)}
        />
      </div>
    </>
  );
};

export default StaticPersonRow;
