import React from "react";
import { useTranslation } from "react-i18next";
import {
  DOC,
  FRONTEND_URL,
  SIGNING_ACTIVE_FIXED_ITEM,
} from "../../../helpers/constant";

import Stepper from "../commons/Stepper";

import PlaceField from "../PlaceField";
import ReviewSend from "../ReviewSend";

import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SelectDocument from "../SelectDocument";
import AddSigners from "../AddSigners";
import { useHashString } from "helpers/hooks";

const Request = () => {
  const { t } = useTranslation();
  // usePreventPageLeave();
  const activeItemId = useHashString(0, "number");

  const stepperData = [
    {
      name: t("sign.selectDocument.text"),
      icon: <FontAwesomeIcon icon={faUser} />,
      component: (
        <SelectDocument atr={DOC.request} activeItemId={activeItemId} />
      ),
      pathName: FRONTEND_URL.sign_selected_document,
    },
    {
      name: t("sign.addSigners.text"),
      icon: <DescriptionOutlinedIcon />,
      component: <AddSigners atr={DOC.request} activeItemId={activeItemId} />,
      pathName: FRONTEND_URL.sign_add_signers,
    },
    {
      name: t("sign.placeFields.text"),
      icon: <DescriptionOutlinedIcon />,
      component: <PlaceField atr={DOC.request} activeItemId={activeItemId} />,
      pathName: FRONTEND_URL.sign_place_fields,
    },
    {
      name: t("sign.reviewSend.text"),
      icon: <ListAltOutlinedIcon />,
      component: <ReviewSend atr={DOC.request} activeItemId={activeItemId} />,
      pathName: FRONTEND_URL.sign_review_send,
    },
  ];

  return (
    <div>
      <Stepper
        items={stepperData}
        isFixed={activeItemId === SIGNING_ACTIVE_FIXED_ITEM.request}
        activeItemId={activeItemId}
      />
      {stepperData?.[activeItemId]?.component}
    </div>
  );
};

export default Request;
