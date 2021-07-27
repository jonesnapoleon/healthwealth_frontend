import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DOC, FRONTEND_URL } from "../../../helpers/constant";

import Stepper from "../commons/Stepper";

import PlaceField from "../PlaceField";
import ReviewSend from "../ReviewSend";

// import { usePreventPageLeave } from "../../../helpers/hooks";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Request = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [availableLevel, setAvailableItem] = useState(0);
  const { t } = useTranslation();
  // usePreventPageLeave();

  const stepperData = useMemo(
    () => [
      {
        name: t("sign.selectDocument.text"),
        icon: <DescriptionOutlinedIcon />,
        component: (
          <PlaceField
            activeItem={activeItem}
            availableLevel={availableLevel}
            setActiveItem={setActiveItem}
            atr={DOC.request}
          />
        ),
        pathName: FRONTEND_URL.sign_place_fields,
      },
      // {
      //   name: t("sign.reviewSend.text"),
      //   icon: <ListAltOutlinedIcon />,
      //   component: (
      //     <ReviewSend
      //       activeItem={activeItem}
      //       availableLevel={availableLevel}
      //       atr={DOC.request}
      //       setAvailableItem={setAvailableItem}
      //       setActiveItem={setActiveItem}
      //     />
      //   ),
      //   pathName: FRONTEND_URL.sign_place_fields,
      // },
      // {
      //   name: t("sign.placeFields.text"),
      //   icon: <PlaceFieldIcon />,
      //   component: (
      //     <PlaceField
      //       activeItem={activeItem}
      //       availableLevel={availableLevel}
      //       atr={DOC.request}
      //       setAvailableItem={setAvailableItem}
      //       setActiveItem={setActiveItem}
      //     />
      //   ),
      //   pathName: FRONTEND_URL.sign_place_fields,
      // },
      // {
      //   name: t("sign.reviewSend.text"),
      //   icon: <ReviewSendIcon />,
      //   pathName: FRONTEND_URL.sign_review_send,
      // },
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
        isFixed={activeItem === 0}
      />
      {stepperData?.[activeItem]?.component}
    </div>
  );
};

export default Request;
