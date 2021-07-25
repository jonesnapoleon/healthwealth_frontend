import React from "react";

import "../imageupload.scss";

const ModalSign = ({ meta, onClick }) => {
  const { icon, head, desc } = meta;

  const ImageGetInput = () => (
    <>
      <div>
        <div>{head}</div>
        <div>{desc}</div>
      </div>
      <div>{icon}</div>
    </>
  );

  return (
    <div className="modal-sign-container" onClick={onClick}>
      <ImageGetInput />
    </div>
  );
};

export default ModalSign;
