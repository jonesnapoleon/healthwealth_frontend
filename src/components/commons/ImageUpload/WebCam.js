import React from "react";

const WebCam = ({ imageDataURL, setIsRecording }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    imageDataURL?.set(imageSrc);
    setIsRecording(false);
  }, [webcamRef, imageDataURL, setIsRecording]);

  return (
    <>
      <button onClick={capture} className="btn btn-outline-light">
        ⚪
      </button>
    </>
  );
};

export default WebCam;
