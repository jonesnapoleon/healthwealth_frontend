import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  base: {
    boxShadow: "none",
    "& .MuiAccordionSummary-root": {
      padding: 0,
    },
  },
}));

const ControlledAccordions = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {}
      <Accordion square className={classes.base}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square className={classes.base}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const RightSnippetArea = ({ currentField }) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    console.log(currentField);
  }, [currentField]);

  return (
    <div className="right-sidebar position-fixed">
      <div className="container">
        <div className="pt-2 d-flex justify-content-between">
          <div>
            <strong>{t("sign.placeFields.left.signers")}</strong>
          </div>
          <div>JON</div>
        </div>
        <ControlledAccordions />
      </div>
    </div>
  );
};

export default RightSnippetArea;
