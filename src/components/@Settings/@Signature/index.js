// import FasterThanPrinting from "components/@Sign/commons/FasterThanPrinting";
// import ModalStucture from "components/@Sign/commons/ModalStructure";
import { getAllSignatures } from "api/auth";
import VerifySignature from "components/@Sign/commons/VerifySignature";
import { useAuth } from "contexts/AuthContext";
import { useSnackbar } from "contexts/SnackbarContext";
import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../contexts/ModalContext";
import ModalSign from "../../commons/ImageUpload/ModalSign";
import SignatureModal from "../../commons/SignatureModal";
import "./signature.scss";

const Signature = () => {
  const { t } = useTranslation();
  const { setInnerComponent, show, backgroundColor, size, bg } = useModal();
  const { signatures, setSignatures } = useAuth();
  const { addSnackbar } = useSnackbar();

  const fetchingSignatures = useCallback(async () => {
    if (!signatures) {
      try {
        const res = await getAllSignatures();
        if (res) {
          setSignatures(res);
        }
      } catch (err) {
        addSnackbar(String(err));
      }
    }
  }, [setSignatures, signatures, addSnackbar]);
  useEffect(() => {
    fetchingSignatures();
  }, [fetchingSignatures]);

  const nonInitialSignature = useMemo(
    () => (signatures ? signatures?.filter((sign) => !sign?.isInitial) : []),
    [signatures]
  );
  const initialSignature = useMemo(
    () => (signatures ? signatures?.filter((sign) => sign?.isInitial) : []),
    [signatures]
  );

  return (
    <div className="signature-page-container">
      <div>
        <div className="head bold">{t("settings.signature.text")}</div>
        <ModalSign
          meta={{ head: t("settings.signature.addSignature") }}
          onClick={() => {
            setInnerComponent(<SignatureModal isInitial={false} />);
            show?.set(true);
          }}
        />
        <div className="parent">
          {nonInitialSignature?.map((sign, i) => (
            <img
              key={i}
              src={sign?.linkToImg}
              className="non-initial-signature"
              alt=""
            />
          ))}
        </div>
      </div>
      <div>
        <div className="head bold">{t("settings.signature.initial")}</div>
        <ModalSign
          meta={{ head: t("settings.signature.addInitials") }}
          onClick={() => {
            setInnerComponent(<VerifySignature />);
            size?.set("unset");
            backgroundColor?.set("white");
            bg?.set("light");
            show?.set(true);
          }}
        />
        <div className="parent">
          {initialSignature?.map((sign) => (
            <img src={sign?.linkToImg} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signature;

// setInnerComponent(<ModalStucture />);
//             size?.set("small");
//             backgroundColor?.set("white");
//             bg?.set("light");
//             show?.set(true);
