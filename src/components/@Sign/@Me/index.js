import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getReadableWord } from "../../../helpers/transformer";
import { FRONTEND_URL } from "../../../helpers/constant";

import SelectDocument from "../SelectDocument";
import Stepper from "../../layout/Stepper";

import PlaceField from "../PlaceField";
import { ReactComponent as SelectIcon } from "../../../assets/images/document tab icon.svg";
import { ReactComponent as PlaceFieldIcon } from "../../../assets/images/document tab icon.svg";
import { ReactComponent as ReviewSendIcon } from "../../../assets/images/document tab icon.svg";
// import personAddIcon from "../../../assets/images/Progress Bar - Step 1 Icon.svg";
// import placeFieldIcon from "../../../assets/images/Progress Bar - Step 2 Icon.svg";
// import reviewSendIcon from "../../../assets/images/Progress Bar - Step 3 Icon.svg";

const Me = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [availableLevel, setAvailableItem] = useState(0);
  const history = useHistory();
  const { t } = useTranslation();

  const stepperData = useMemo(
    () => [
      {
        name: t("sign.selectDocument.text"),
        icon: <SelectIcon />,
        component: (
          <SelectDocument
            activeItem={activeItem}
            availableLevel={availableLevel}
            setActiveItem={setActiveItem}
            setAvailableItem={setAvailableItem}
          />
        ),
      },
      {
        name: t("sign.placeFields.text"),
        icon: <PlaceFieldIcon />,
        component: (
          <PlaceField
            activeItem={activeItem}
            availableLevel={availableLevel}
            setActiveItem={setActiveItem}
          />
        ),
      },
      {
        name: t("sign.reviewSend.text"),
        icon: <ReviewSendIcon />,
      },
    ],
    [activeItem, t, availableLevel]
  );

  useEffect(() => {
    history.push(
      `${FRONTEND_URL.me}#${getReadableWord(stepperData?.[activeItem]?.name)}`
    );
  }, [activeItem, history, stepperData]);

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
