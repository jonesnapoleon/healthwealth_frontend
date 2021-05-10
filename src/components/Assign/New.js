import React, { useEffect } from "react";
import Assign from "./Assign";
import { useSelector, useDispatch } from "react-redux";
import Stepper from "../commons/Stepper";
import { Box } from "gestalt";
import UploadDocument from "./UploadDocument";
import { setActiveStage, activeStage } from "./AssignSlice";

const stepperData = [
  {
    name: "Select documents",
    icon: "folder",
  },
  {
    name: "Add signers",
    icon: "person-add",
  },
  {
    name: "Place fields",
    icon: "compose",
  },
  {
    name: "Review and Send",
    icon: "send",
  },
];

const AssignUsers = () => {
  const activeItem = useSelector(activeStage);
  const dispatch = useDispatch();

  const getContent = () => {
    if (activeItem === 0) return <UploadDocument />;
    if (activeItem === 1) return <Assign />;
    // if(activeItem === 0) return <UploadDocument/>
  };

  return (
    <Box padding={3}>
      <Stepper
        items={stepperData}
        activeItem={activeItem}
        setActiveItem={(inc) =>
          activeItem + inc >= 0 &&
          activeItem + inc < stepperData?.length &&
          dispatch(setActiveStage(activeItem + inc))
        }
      />
      {getContent()}
    </Box>
  );
};

export default AssignUsers;
