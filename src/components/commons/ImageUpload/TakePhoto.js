import React, { useEffect, useState } from "react";
import OpenCam from "./OpenCam";
// import WebCam from "./WebCam";
// import Webcam from "react-webcam";

// const videoConstraints = {
//   width: "60%",
//   height: "auto",
//   facingMode: "user",
// };

const PlayerORImage = ({ imageData }) => {
  console.log(imageData);
  return Boolean(imageData.value) && <img src={imageData.value} alt={""} />;
};

const TakePhoto = ({ data }) => {
  const [isRecording, setIsRecording] = useState(!false);
  // const webcamRef = useRef(null);
  console.log(data);

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   data.set(imageSrc);
  //   setIsRecording(false);
  //   onClose();
  // }, [webcamRef, data, setIsRecording, onClose]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="articles">
      {isRecording ? (
        <>
          <OpenCam imageDataURL={data} setIsRecording={setIsRecording} />

          {/* <div className="open-cam-container item-centery">
            <Webcam
              audio={false}
              height={videoConstraints?.height}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={videoConstraints?.width}
              videoConstraints={videoConstraints}
            />
            <button onClick={() => capture()} className="btn btn-outline-light">
              ⚪
            </button>
          </div> */}
        </>
      ) : (
        <>
          <div style={{ margin: "0 1rem" }}>
            <div className="image-frame">
              <PlayerORImage imageData={data} />
            </div>
          </div>
          <div className="bottom-photo-container">
            <div>
              <div
                className="small-icon"
                onClick={() => {
                  setIsRecording(true);
                }}
              ></div>
              Ambil ulang
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TakePhoto;
