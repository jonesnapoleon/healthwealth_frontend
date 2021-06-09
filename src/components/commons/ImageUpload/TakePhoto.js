import React, { useState } from "react";
import OpenCam from "./OpenCam";

const TakePhoto = ({ data }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(!false);
  const [isRecording, setIsRecording] = useState(!false);
  // const [isSimpaned, setIsSimpaned] = useState(false);

  const playerORImage = (imageData) =>
    Boolean(imageData?.value) && <img src={imageData?.value} alt={""} />;

  // const handleClick = () => {
  //   if (isKtpForLife.value !== "true" && ktpNumber.value && ktpLife.value) {
  //     ktpLife.onChange({ target: { value: null } });
  //   }
  // };

  //   const check = () => {

  //   };

  return (
    <div className="articles">
      {/* <AlertDialog
        title={
          documentType === "ktp"
            ? t("loanRequest.takePhoto.guideKtp")
            : t("loanRequest.takePhoto.guideSelfie")
        }
        subTitle={<Lists ul lists={lists} />}
        imageNodes={[
          "https://thumbs.dreamstime.com/z/blank-check-open-space-your-text-19414606.jpg",
          "https://thumbs.dreamstime.com/z/blank-check-open-space-your-text-19414606.jpg",
        ]}
        onClick={() => {
          setIsAlertOpen((a) => !a);
          setIsRecording(true);
        }}
        titleAction={"Ambil foto"}
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
      /> */}

      {isRecording ? (
        <OpenCam
          imageDataURL={data?.value}
          setIsRecording={setIsRecording}
          isAlertOpen={isAlertOpen}
        />
      ) : (
        <>
          <div style={{ margin: "0 1rem" }}>
            <div className="image-frame">{playerORImage(data)}</div>
          </div>
          <div className="bottom-photo-container">
            <div>
              <div
                className="small-icon"
                onClick={() => {
                  setIsAlertOpen(false);
                  setIsRecording(true);
                }}
              ></div>
              Ambil ulang
            </div>
            {/* <Grid item xs={6}>
                {!isSimpaned && (
                  <div
                    className="small-icon"
                    onClick={() =>
                      documentType !== "ktp"
                        ? history.push(routerPath.loanRequest.addDocument)
                        : setIsSimpaned(true)
                    }
                  />
                )}
                {!isSimpaned ? "Simpan" : "Tersimpan"}
              </Grid> */}
          </div>
        </>
      )}
    </div>
  );
};

export default TakePhoto;
