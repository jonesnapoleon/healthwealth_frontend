import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFile } from "../../../helpers/hooks";

import ImageUpload from "../../commons/ImageUpload";

import ktpSvg from "../../../assets/images/ID Card icon.svg";
import cameraSvg from "../../../assets/images/Camera icon.svg";
import TakePhoto from "../../commons/ImageUpload/TakePhoto";
import { useModal } from "../../../contexts/ModalContext";

const Picture = () => {
  const { t } = useTranslation();
  // const [takePhoto, setTakePhoto] = useState(false);
  const { setInnerComponent, show } = useModal();
  const identity = useFile();
  const takePict = useFile();

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
      <div className="lead">{t("settings.ekyc.proofIdentity")}</div>
      <div className="mt-1">
        <ImageUpload meta={imagesData[0]} data={identity} />
      </div>
      <div className="lead mt-5">{t("settings.ekyc.takeAPicture")}</div>
      <div className="mt-1">
        <ImageUpload
          meta={imagesData[1]}
          data={takePict}
          onClick={() => {
            setInnerComponent(<TakePhoto />);
            show?.set(true);
          }}
        />
      </div>
      <div className="mt-5">
        <button className="btn btn-outline-primary">
          {t("general.submit")}
        </button>
      </div>
    </>
  );
};

export default Picture;
