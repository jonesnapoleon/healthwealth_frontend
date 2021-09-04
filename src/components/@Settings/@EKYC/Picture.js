import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFile, useInput, useRefreshedData } from "../../../helpers/hooks";

import ImageUpload from "../../commons/ImageUpload";
import { ReactComponent as KtpSvg } from "../../../assets/bnw/ID Card icon.svg";
import { ReactComponent as CameraSvg } from "../../../assets/bnw/Camera icon.svg";
import { useModal } from "../../../contexts/ModalContext";
import DragDropClass from "../../commons/ImageUpload/DragDropClass";
import { uploadKTP } from "../../../api/auth";
// uploadSelfie
import Snackbar from "../../commons/Snackbar";
import { useAuth } from "../../../contexts/AuthContext";
import Progressbar from "components/commons/Progressbar";
import { useProgressBar } from "helpers/hooks";

const Picture = () => {
  const { auth, putAuth } = useAuth();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [takePhoto, setTakePhoto] = useState(false);
  const { openTakePhoto } = useModal();
  const progress = useProgressBar();

  const identity = useFile();
  const isIdentityEdit = useRefreshedData(!!identity?.file);
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
      if (res?.data) {
        identity.setFile(null);
        isIdentityEdit.set(false);
        progress.set(100);
        putAuth(res.data);
        setSuccess(t("settings.ekyc.submitIdentitySuccess"));
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(String(err));
      progress.set(-1);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const imagesData = [
    {
      icon: <KtpSvg />,
      isUpload: true,
      head: t("settings.ekyc.proofIdentityHead"),
      desc: t("settings.ekyc.proofIdentityDesc"),
    },
    {
      icon: <CameraSvg />,
      isUpload: !true,
      head: t("settings.ekyc.takeAPictureHead"),
      desc: t("settings.ekyc.takeAPictureDesc"),
    },
  ];

  const renderButtonIdentity = () => {
    if (!(!identity?.file || identity?.file === null)) {
      return (
        <div className="mt-3">
          <div>
            <Progressbar progress={progress} />
          </div>
          <div>
            <button
              className="btn btn-outline-primary"
              disabled={loading}
              onClick={handleSubmitIdentity}
            >
              {t("general.submit")}
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {error && <Snackbar text={error} />}
      {success && <Snackbar type="success" text={success} />}

      <div className="bold head">
        {t("settings.ekyc.proofIdentity")}{" "}
        {auth?.ktp_url && !isIdentityEdit.value && (
          <span onClick={() => isIdentityEdit.set(true)}>
            {t("general.edit")}
          </span>
        )}
        {auth?.ktp_url && isIdentityEdit.value && (
          <span onClick={() => isIdentityEdit.set(false)}>
            {t("general.cancel")}
          </span>
        )}
      </div>
      <div className="mt-1">
        <DragDropClass
          handleDrop={(file) => {
            if (file) identity?.setFile(file[0]);
          }}
        >
          <ImageUpload
            meta={{ ...imagesData[0], isEdit: isIdentityEdit.value }}
            data={identity}
            currentFile={auth?.ktp_url}
          />
        </DragDropClass>
      </div>
      {renderButtonIdentity()}

      <div className="bold head mt-5">{t("settings.ekyc.takeAPicture")}</div>
      <div className="mt-1">
        <ImageUpload
          meta={imagesData[1]}
          // data={takePict}
          currentFile={auth?.selfie_url}
          onClick={() => openTakePhoto({ data: takePict })}
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
