import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFile, useInput } from "../../../helpers/hooks";

import ImageUpload from "../../commons/ImageUpload";
import ktpSvg from "../../../assets/bnw/ID Card icon.svg";
import cameraSvg from "../../../assets/bnw/Camera icon.svg";
import TakePhoto from "../../commons/ImageUpload/TakePhoto";
import { useModal } from "../../../contexts/ModalContext";
import DragDropClass from "../../commons/ImageUpload/DragDropClass";
import { uploadKTP } from "../../../api/auth";
// uploadSelfie
import Snackbar from "../../commons/Snackbar";

const Picture = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [takePhoto, setTakePhoto] = useState(false);
  const { setInnerComponent, show } = useModal();
  const identity = useFile();
  const takePict = useInput(null);

  // useEffect(() => {
  //   console.log(takePict);
  // }, [takePict]);

  // useEffect(() => {
  //   console.log(identity);
  // }, [identity]);

  const handleSubmitIdentity = async () => {
    try {
      setLoading(true);
      if (!identity?.file || identity?.file === null)
        throw new Error(t("form.error.fileNotUploadedYet"));
      const res = await uploadKTP(identity.file);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const imagesData = [
    {
      icon: ktpSvg,
      isUpload: true,
      head: t("settings.ekyc.proofIdentityHead"),
      desc: t("settings.ekyc.proofIdentityDesc"),
    },
    {
      icon: cameraSvg,
      isUpload: !true,
      head: t("settings.ekyc.takeAPictureHead"),
      desc: t("settings.ekyc.takeAPictureDesc"),
    },
  ];

  return (
    <>
      {error && <Snackbar text={error} />}

      <div className="lead">{t("settings.ekyc.proofIdentity")}</div>
      <div className="mt-1">
        <DragDropClass
          handleDrop={(file) => {
            if (file) identity?.setFile(file[0]);
          }}
        >
          <ImageUpload meta={imagesData[0]} data={identity} />
        </DragDropClass>
      </div>
      {!(!identity?.file || identity?.file === null) && (
        <div className="mt-3">
          <button
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={handleSubmitIdentity}
          >
            {t("general.submit")}
          </button>
        </div>
      )}

      <div className="lead mt-5">{t("settings.ekyc.takeAPicture")}</div>
      <div className="mt-1">
        <ImageUpload
          meta={imagesData[1]}
          // data={takePict}
          onClick={() => {
            setInnerComponent(<TakePhoto data={takePict} />);
            show?.set(true);
          }}
        />
      </div>
      {takePict?.value && (
        <div className="mt-3">
          <button className="btn btn-outline-primary">
            {t("general.submit")}
          </button>
        </div>
      )}
    </>
  );
};

export default Picture;
