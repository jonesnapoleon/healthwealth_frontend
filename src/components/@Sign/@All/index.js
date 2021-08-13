import React, { useEffect, useState } from "react";
import SelectDocument from "../SelectDocument";
import AddSigners from "../AddSigners";
import Stepper from "../commons/Stepper";
import { useTranslation } from "react-i18next";

// import { ReactComponent as SelectIcon } from "../../../assets/bnw/Progress Bar - Step 1 Icon.svg";
// import { ReactComponent as PersonAddIcon } from "../../../assets/bnw/Progress Bar - Step 2 Icon.svg";
// import { ReactComponent as PlaceFieldIcon } from "../../../assets/bnw/Progress Bar - Step 3 Icon.svg";
// import { ReactComponent as ReviewSendIcon } from "../../../assets/bnw/Progress Bar - Step 4 Icon.svg";
import {
  DOC,
  FRONTEND_URL,
  SIGNING_ACTIVE_FIXED_ITEM,
} from "../../../helpers/constant";
// import { usePreventPageLeave } from "../../../helpers/hooks";

import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
// import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ReviewSend from "../ReviewSend";
import PlaceField from "../PlaceField";
import { useHashString } from "helpers/hooks";

const Me = () => {
  const activeItemId = useHashString(0, "number");
  const { t } = useTranslation();

  // usePreventPageLeave();

  const stepperData = [
    {
      name: t("sign.selectDocument.text"),
      icon: <FontAwesomeIcon icon={faUser} />,
      component: <SelectDocument activeItemId={activeItemId} atr={DOC.all} />,
      pathName: FRONTEND_URL.sign_selected_document,
    },
    {
      name: t("sign.addSigners.text"),
      icon: <DescriptionOutlinedIcon />,
      component: <AddSigners atr={DOC.all} activeItemId={activeItemId} />,
      pathName: FRONTEND_URL.sign_add_signers,
    },
    {
      name: t("sign.placeFields.text"),
      icon: <DescriptionOutlinedIcon />,
      component: <PlaceField activeItemId={activeItemId} atr={DOC.all} />,
      pathName: FRONTEND_URL.sign_place_fields,
    },
    {
      name: t("sign.reviewSend.text"),
      icon: <ListAltOutlinedIcon />,
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

export default Me;
