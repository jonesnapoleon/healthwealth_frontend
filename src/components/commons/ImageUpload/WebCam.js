import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: "60%",
  height: "auto",
  facingMode: "user",
};

const WebCam = ({ imageDataURL, setIsRecording }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    imageDataURL?.set(imageSrc);
    setIsRecording(false);
  }, [webcamRef, imageDataURL, setIsRecording]);

  return (
    <>
      <Webcam
        audio={false}
        height={videoConstraints?.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints?.width}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture} className="btn btn-outline-light">
        ⚪
      </button>
    </>
  );
};

export default WebCam;
