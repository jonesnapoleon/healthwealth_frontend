import React from "react";
import DoneIcon from "@material-ui/icons/Done";

import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import "./timeline.scss";
import { getFrontendDateFormat } from "helpers/transformer";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  root: {
    padding: "0",
  },
  item: {
    "&:before": {
      flex: "unset",
      padding: "0",
    },
    " small": {
      fontSize: ".8rem",
    },
  },
  dot: {
    fontSize: ".5rem",
  },
}));

export default function CustomizedTimeline({ data }) {
  const classes = useStyles();

  return (
    <Timeline className={classes.root}>
      {data && data?.length > 0 ? (
        data?.map((ele, i) => (
          <TimelineItem className={classes.item} key={i}>
            <TimelineSeparator>
              <TimelineDot variant="outlined">
                <DoneIcon className={classes.dot} />
              </TimelineDot>
              {i !== data?.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent className="timeline-text">
              <div style={{ fontSize: "0.8rem" }}>
                {ele?.fullname} {ele?.action}
              </div>
              <div>{getFrontendDateFormat(ele?.updatedAt)}</div>
              <div>IP: {ele?.ip}</div>
            </TimelineContent>
          </TimelineItem>
        ))
      ) : (
        <h1>-</h1>
      )}
    </Timeline>
  );
}
