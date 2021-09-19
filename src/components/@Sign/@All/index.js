import React from "react";
import SelectDocument from "../SelectDocument";
import AddSigners from "../AddSigners";
import Stepper from "../commons/Stepper";
import { useTranslation } from "react-i18next";

import {
  DOC,
  FRONTEND_URL,
  SIGNING_ACTIVE_FIXED_ITEM,
} from "../../../helpers/constant";
// import { usePreventPageLeave } from "../../../helpers/hooks";

import ReviewSend from "../ReviewSend";
import PlaceField from "../PlaceField";

import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useHashString } from "helpers/hooks";

const All = () => {
  const activeItemId = useHashString(0, "number");
  const { t } = useTranslation();

  // usePreventPageLeave();

  const stepperData = [
    {
      name: t("sign.selectDocument.text"),
      icon: <DescriptionRoundedIcon />,
      component: <SelectDocument activeItemId={activeItemId} atr={DOC.all} />,
      pathName: FRONTEND_URL.sign_selected_document,
    },
    {
      name: t("sign.addSigners.text"),
      icon: <FontAwesomeIcon icon={faUser} />,
      component: <AddSigners atr={DOC.all} activeItemId={activeItemId} />,
      pathName: FRONTEND_URL.sign_add_signers,
    },
    {
      name: t("sign.placeFields.text"),
      icon: <ListAltRoundedIcon />,
      component: <PlaceField activeItemId={activeItemId} atr={DOC.all} />,
      pathName: FRONTEND_URL.sign_place_fields,
    },
    {
      name: t("sign.reviewSend.text"),
      icon: <SendRoundedIcon />,
      component: <ReviewSend activeItemId={activeItemId} atr={DOC.all} />,
      pathName: FRONTEND_URL.sign_place_fields,
    },
  ];

  return (
    <div>
      <Stepper
        items={stepperData}
        isFixed={activeItemId === SIGNING_ACTIVE_FIXED_ITEM.all}
        activeItemId={activeItemId}
      />
      {stepperData?.[activeItemId]?.component}
    </div>
  );
};

export default All;
