import React, { useEffect, useState } from "react";
import OpenCam from "./OpenCam";
import WebCam from "./WebCam";

const TakePhoto = ({ data }) => {
  const [isRecording, setIsRecording] = useState(!false);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const PlayerORImage = ({ imageData }) => {
    return Boolean(imageData.value) && <img src={imageData?.value} alt={""} />;
  };

  return (
    <div className="articles">
      {isRecording ? (
        <>
          <OpenCam imageDataURL={data} setIsRecording={setIsRecording} />
          <WebCam imageDataURL={data} setIsRecording={setIsRecording} />
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
