import React, { useState } from "react";
import SelectDocument from "../SelectDocument";
import AddSigners from "../AddSigners";
import Stepper from "../../layout/Stepper";
import { useTranslation } from "react-i18next";

import { ReactComponent as SelectIcon } from "../../../assets/images/document tab icon.svg";
import { ReactComponent as PlaceFieldIcon } from "../../../assets/images/document tab icon.svg";
import { ReactComponent as ReviewSendIcon } from "../../../assets/images/document tab icon.svg";
import { ReactComponent as PersonAddIcon } from "../../../assets/images/document tab icon.svg";

// import personAddIcon from "../../../assets/images/Progress Bar - Step 1 Icon.svg";
// import placeFieldIcon from "../../../assets/images/Progress Bar - Step 2 Icon.svg";
// import reviewSendIcon from "../../../assets/images/Progress Bar - Step 3 Icon.svg";

const Me = () => {
  const [activeItem, setActiveItem] = useState(0);
  const availableLevel = activeItem;

  const { t } = useTranslation();

  const stepperData = [
    {
      name: t("sign.selectDocument.text"),
      icon: <SelectIcon />,
      component: (
        <AddSigners
          activeItem={activeItem}
          availableLevel={availableLevel}
          setActiveItem={setActiveItem}
        />
      ),
    },
    {
      name: t("sign.addSigners.text"),
      icon: <PersonAddIcon />,
      component: (
        <SelectDocument
          activeItem={activeItem}
          availableLevel={availableLevel}
          setActiveItem={setActiveItem}
        />
        // <AddSigners
        //   activeItem={activeItem}
        //   availableLevel={availableLevel}
        //   setActiveItem={setActiveItem}
        // />
      ),
    },
    {
      name: t("sign.placeFields.text"),
      icon: <PlaceFieldIcon />,
    },
    {
      name: t("sign.reviewSend.text"),
      icon: <ReviewSendIcon />,
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
