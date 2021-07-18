import React, { useState } from "react";
import SelectDocument from "../SelectDocument";
import AddSigners from "../AddSigners";
import Stepper from "../../layout/Stepper";
import { useTranslation } from "react-i18next";

import { ReactComponent as SelectIcon } from "../../../assets/bnw/Progress Bar - Step 1 Icon.svg";
import { ReactComponent as PersonAddIcon } from "../../../assets/bnw/Progress Bar - Step 2 Icon.svg";
import { ReactComponent as PlaceFieldIcon } from "../../../assets/bnw/Progress Bar - Step 3 Icon.svg";
import { ReactComponent as ReviewSendIcon } from "../../../assets/bnw/Progress Bar - Step 4 Icon.svg";
import { DOC, FRONTEND_URL } from "../../../helpers/constant";
import { usePreventPageLeave } from "../../../helpers/hooks";

const Me = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [availableLevel, setAvailableLevel] = useState(activeItem);

  const { t } = useTranslation();
  // usePreventPageLeave();

  const stepperData = [
    {
      name: t("sign.selectDocument.text"),
      icon: <SelectIcon />,
      component: (
        <AddSigners
          activeItem={activeItem}
          availableLevel={availableLevel}
          setActiveItem={setActiveItem}
          setAvailableLevel={setAvailableLevel}
          atr={DOC.all}
        />
      ),
      pathName: FRONTEND_URL.sign_selected_document,
    },
    {
      name: t("sign.addSigners.text"),
      icon: <PersonAddIcon />,
      component: (
        <SelectDocument
          activeItem={activeItem}
          availableLevel={availableLevel}
          setActiveItem={setActiveItem}
          atr={DOC.all}
        />
        // <AddSigners
        //   activeItem={activeItem}
        //   availableLevel={availableLevel}
        //   setActiveItem={setActiveItem}
        // />
      ),
      pathName: FRONTEND_URL.sign_add_signers,
    },
    {
      name: t("sign.placeFields.text"),
      icon: <PlaceFieldIcon />,
      pathName: FRONTEND_URL.sign_place_fields,
    },
    {
      name: t("sign.reviewSend.text"),
      icon: <ReviewSendIcon />,
      pathName: FRONTEND_URL.sign_review_send,
    },
  ];

  return (
    <div>
      <Stepper
        items={stepperData}
        activeItem={activeItem}
        setActiveItem={(inc) =>
          activeItem + inc >= 0 &&
          activeItem + inc < stepperData?.length &&
          activeItem + inc <= availableLevel &&
          setActiveItem(activeItem + inc)
        }
        availableLevel={availableLevel}
      />
      {stepperData?.[activeItem]?.component}
    </div>
  );
};

export default Me;
