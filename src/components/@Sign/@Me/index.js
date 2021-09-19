import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DOC,
  FRONTEND_URL,
  SIGNING_ACTIVE_FIXED_ITEM,
} from "../../../helpers/constant";

import SelectDocument from "../SelectDocument";
import Stepper from "../commons/Stepper";

import PlaceField from "../PlaceField";
// import { usePreventPageLeave } from "../../../helpers/hooks";

import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { useHashString } from "helpers/hooks";
import ReviewSend from "../ReviewSend";

const Me = () => {
  const activeItemId = useHashString(0, "number");
  const { t } = useTranslation();

  // usePreventPageLeave();

  const stepperData = useMemo(
    () => [
      {
        name: t("sign.selectDocument.text"),
        icon: <DescriptionRoundedIcon />,
        component: <SelectDocument activeItemId={activeItemId} atr={DOC.me} />,
        pathName: FRONTEND_URL.sign_selected_document,
      },
      {
        name: t("sign.placeFields.text"),
        icon: <ListAltRoundedIcon />,
        component: <PlaceField activeItemId={activeItemId} atr={DOC.me} />,
        pathName: FRONTEND_URL.sign_place_fields,
      },
      {
        name: t("sign.reviewSend.text"),
        icon: <SendRoundedIcon />,
        component: <ReviewSend activeItemId={activeItemId} atr={DOC.me} />,
        pathName: FRONTEND_URL.sign_review_send,
      },
    ],
    [activeItemId, t]
  );

  return (
    <div>
      <Stepper
        items={stepperData}
        activeItemId={activeItemId}
        isFixed={activeItemId === SIGNING_ACTIVE_FIXED_ITEM.me}
      />
      {stepperData?.[activeItemId]?.component}
    </div>
  );
};

export default Me;
