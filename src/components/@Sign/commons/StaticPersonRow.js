import React from "react";

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
