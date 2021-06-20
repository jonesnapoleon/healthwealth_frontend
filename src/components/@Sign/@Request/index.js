import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { FRONTEND_URL } from "../../../helpers/constant";

import Stepper from "../../layout/Stepper";

import PlaceField from "../PlaceField";
import { ReactComponent as SelectIcon } from "../../../assets/bnw/Progress Bar - Step 1 Icon.svg";
import { ReactComponent as PlaceFieldIcon } from "../../../assets/bnw/Progress Bar - Step 3 Icon.svg";
import { ReactComponent as ReviewSendIcon } from "../../../assets/bnw/Progress Bar - Step 4 Icon.svg";

const Request = () => {
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
          <PlaceField
            activeItem={activeItem}
            availableLevel={availableLevel}
            setActiveItem={setActiveItem}
          />
        ),
        pathName: FRONTEND_URL.sign_place_fields,
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
        pathName: FRONTEND_URL.sign_place_fields,
      },
      {
        name: t("sign.reviewSend.text"),
        icon: <ReviewSendIcon />,
        pathName: FRONTEND_URL.sign_review_send,
      },
    ],
    [activeItem, t, availableLevel]
  );

  //   useEffect(() => {
  //     history.push(`${FRONTEND_URL.me}${stepperData?.[activeItem]?.pathName}`);
  //   }, [activeItem, history, stepperData]);

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

export default Request;
