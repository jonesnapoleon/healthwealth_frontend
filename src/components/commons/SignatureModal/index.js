import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";

const SignatureModal = () => {
  const [imageURL, setImageURL] = useState(null);

  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };

  return (
    <div>
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          className: "signatureCanvas",
        }}
      />
      <button onClick={save}>Save</button>
      <button onClick={clear}>Clear</button>
      {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px",
          }}
        />
      ) : null}
    </div>
  );
};
export default SignatureModal;
