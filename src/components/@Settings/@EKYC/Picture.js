import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFile, useInput, useRefreshedData } from "../../../helpers/hooks";

import ImageUpload from "../../commons/ImageUpload";
import { ReactComponent as KtpSvg } from "../../../assets/bnw/ID Card icon.svg";
import { ReactComponent as CameraSvg } from "../../../assets/bnw/Camera icon.svg";
import { useModal } from "../../../contexts/ModalContext";
import DragDropClass from "../../commons/ImageUpload/DragDropClass";
import { uploadKTP, uploadSelfie } from "../../../api/auth";
// uploadSelfie
import { useAuth } from "../../../contexts/AuthContext";
import Progressbar from "components/commons/Progressbar";
import { useProgressBar } from "helpers/hooks";
import EditRounded from "@material-ui/icons/EditRounded";
import CancelRounded from "@material-ui/icons/CancelRounded";
import { useSnackbar } from "contexts/SnackbarContext";

const Picture = () => {
  const { auth, putAuth } = useAuth();
  const { t } = useTranslation();
  const { addSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { openTakePhoto } = useModal();
  const identityProgress = useProgressBar();
  const pictureProgress = useProgressBar();

  const takePict = useInput(null);
  const identity = useFile();
  const isIdentityEdit = useRefreshedData(!!identity?.file);
  const isPictureEdit = useRefreshedData(!!takePict.value);

  const handleSubmitIdentity = async () => {
    try {
      identityProgress.set(1);
      setLoading(true);
      if (!identity?.file || identity?.file === null)
        throw new Error(t("form.error.fileNotUploadedYet"));
      const res = await uploadKTP(identity.file);
      if (res?.data) {
        identity.setFile(null);
        isIdentityEdit.set(false);
        identityProgress.set(100);
        putAuth(res.data);
        addSnackbar(t("settings.ekyc.submitIdentitySuccess"), "success");
      }
    } catch (err) {
      addSnackbar(String(err));
      identityProgress.set(-1);
    } finally {
      identityProgress.set(0);
      setLoading(false);
    }
  };

  const handleSubmitPicture = async () => {
    try {
      pictureProgress.set(1);
      setLoading(true);
      if (!takePict?.value || takePict?.file === null)
        throw new Error(t("form.error.fileNotUploadedYet"));
      const res = await uploadSelfie(takePict.value);
      if (res?.data) {
        takePict.set(null);
        isPictureEdit.set(false);
        pictureProgress.set(100);
        putAuth(res.data);
        addSnackbar(t("settings.ekyc.submitIdentitySuccess"), "success");
      }
    } catch (err) {
      addSnackbar(String(err));
      pictureProgress.set(-1);
    } finally {
      setLoading(false);
      pictureProgress.set(0);
    }
  };

  const imagesData = [
    {
      isSelfie: false,
      icon: <KtpSvg />,
      isUpload: true,
      head: t("settings.ekyc.proofIdentityHead"),
      desc: t("settings.ekyc.proofIdentityDesc"),
    },
    {
      isSelfie: true,
      icon: <CameraSvg />,
      isUpload: !true,
      head: t("settings.ekyc.takeAPictureHead"),
      desc: t("settings.ekyc.takeAPictureDesc"),
    },
  ];

  const renderButtonIdentity = () => {
    if (!(!identity?.file || identity?.file === null) && isIdentityEdit.value) {
      return (
        <div className="mt-2">
          <div>
            <Progressbar progress={identityProgress.value} />
          </div>
          <div className="mt-2">
            <button
              className="btn btn-black btn-primary btn-sm"
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

  const renderButtonPicture = () => {
    if (takePict?.value)
      return (
        <div className="mt-2">
          <div>
            <Progressbar progress={pictureProgress.value} />
          </div>
          <div className="mt-2">
            <button
              className="btn btn-black btn-primary btn-md"
              disabled={loading}
              onClick={handleSubmitPicture}
            >
              {t("general.submit")}
            </button>
          </div>
        </div>
      );
  };

  return (
    <>
      <div className="bold head">
        {t("settings.ekyc.proofIdentity")}{" "}
        {auth?.ktp_url && !isIdentityEdit.value && (
          <EditRounded
            className="cursor-pointer"
            onClick={() => isIdentityEdit.set(true)}
          />
        )}
        {auth?.ktp_url && isIdentityEdit.value && (
          <CancelRounded
            className="cursor-pointer"
            onClick={() => isIdentityEdit.set(false)}
          />
        )}
      </div>
      <div className="">
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

      <div className="bold head mt-4">
        {t("settings.ekyc.takeAPicture")}
        {auth?.selfie_url && !isPictureEdit.value && (
          <EditRounded
            className="cursor-pointer"
            onClick={() => isPictureEdit.set(true)}
          />
        )}
        {auth?.selfie_url && isPictureEdit.value && (
          <CancelRounded
            className="cursor-pointer"
            onClick={() => isPictureEdit.set(false)}
          />
        )}
      </div>
      <div className="">
        <ImageUpload
          meta={imagesData[1]}
          data={takePict}
          currentFile={auth?.selfie_url}
          onClick={() => openTakePhoto({ data: takePict })}
        />
      </div>
      {renderButtonPicture()}
    </>
  );
};

export default Picture;
