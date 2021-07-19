import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import Switch from "@material-ui/core/Switch";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ColorizedSelect from "../commons/ColorizedSelect";

// import { getReadableFieldName } from "./FieldBox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "90%",
    background: "white",
    "& .MuiAccordion-root:before": {
      height: "0",
    },
    "& .MuiAccordion-root.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: 48,
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-content": {
      display: "unset",
    },
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  base: {
    boxShadow: "none",
    padding: "0 15px",
    "& .MuiAccordionSummary-root": {
      padding: 0,
    },
    "& .MuiAccordionDetails-root": {
      padding: "0 0 1rem 0",
    },
  },
}));

const ControlledAccordions = ({
  currentField,
  t,
  setFields,
  fields,
  setCurrentField,
}) => {
  const classes = useStyles();

  console.log("con", currentField);

  return (
    <div className={classes.root}>
      <Accordion square className={classes.base}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {t("sign.placeFields.right.assignedTo")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <input value={t(String(currentField?.signer?.label))} disabled /> */}
          {currentField && (
            <input
              value={currentField?.signer?.label}
              disabled
              className="w-100"
            />
            // <ColorizedSelect
            //   // value={currentField?.signer?.label}
            //   defaultValue={"JONE"}
            //   options={[]}
            //   isOptionDisabled={() => false}
            // />
            // {/* // disabled */}
          )}
        </AccordionDetails>
      </Accordion>
      <hr />
      <Accordion square className={classes.base}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {t("sign.placeFields.right.required")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>{t("sign.placeFields.right.requiredField")}</div>
            <div>
              <Switch
                checked={currentField?.signer?.required}
                disabled={!currentField}
                onChange={(e) => {
                  console.log(e.target, currentField);
                  let temp = fields;
                  let ax = temp.map((oneField) => {
                    return {
                      ...oneField,
                      required:
                        oneField?.uid === currentField?.uid
                          ? e.target.checked
                          : oneField.required,
                    };
                  });
                  setFields(ax);
                  setCurrentField((field) => {
                    return { ...field, required: e.target.checked };
                  });
                }}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <hr />
      <Accordion square className={classes.base}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {t("sign.placeFields.right.fieldName")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <input disabled value={currentField}/> */}
          {/* <Typography>{getReadableFieldName(currentField, t)}</Typography> */}
          {currentField && (
            <input
              value={t(String(currentField?.type))}
              disabled
              className="w-100"
            />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const RightSnippetArea = ({
  setCurrentField,
  currentField,
  onDelete,
  setFields,
  fields,
}) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    console.log(currentField);
  }, [currentField]);

  return (
    <div className="right-sidebar position-fixed">
      <div className="">
        <div className="pt-2 d-flex justify-content-between align-items-center weird wrapper">
          <div className="lead font-weight-bolder">
            {t("sign.placeFields.right.signature")}
          </div>
          {currentField && <div onClick={onDelete}>JON</div>}
        </div>
      </div>
      <ControlledAccordions
        setCurrentField={setCurrentField}
        currentField={currentField}
        t={t}
        setFields={setFields}
        fields={fields}
      />
    </div>
  );
};

export default RightSnippetArea;
