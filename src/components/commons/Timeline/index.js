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

let timelineElements = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Dragontail, Ascana",
    description:
      "Converting data to a graphical interface, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that data.",
    buttonText: "View Frontend Projects",
    date: "August 2016 - present",
    icon: "work",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Skystead, Craonia",
    description:
      "Working hand-in-hand with front-end developers by providing the outward facing web application elements server-side logic. Creating the logic to make the web app function properly, and accomplishing this through the use of server-side scripting languages.",
    buttonText: "View Backend Projects",
    date: "June 2013 - August 2016",
    icon: "work",
  },
  {
    id: 3,
    title: "Quality Assurance Engineer",
    location: "South Warren, Geshington",
    description:
      "Assessing the quality of specifications and technical design documents in order to ensure timely, relevant and meaningful feedback.",
    buttonText: "Company Website",
    date: "September 2011 - June 2013",
    icon: "work",
  },
  {
    id: 4,
    title: "Oak Ridge College",
    location: "South Warren, Geshington",
    description:
      "Online Course in Magical Beasts and Wonders of the World - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
    buttonText: "Course Certificate",
    date: "September 2011",
    icon: "school",
  },
  {
    id: 5,
    title: "Hawking College",
    location: "Skystead, Craonia",
    description:
      "College - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
    buttonText: "College Projects",
    date: "2007 - 2011",
    icon: "school",
  },
  {
    id: 6,
    title: "Marble Hills Grammar School",
    location: "Dragontail, Ascana",
    description:
      "Highschool - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sagittis tellus, non ultrices lacus tempus vel.",
    date: "2003 - 2007",
    icon: "school",
  },
];

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
          <TimelineItem className={classes.item}>
            <TimelineSeparator>
              <TimelineDot variant="outlined">
                <DoneIcon className={classes.dot} />
              </TimelineDot>
              {i !== timelineElements?.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent className="timeline-text">
              <div>{ele?.title}</div>
              <div>{ele?.location}</div>
              <div>{ele?.date}</div>
            </TimelineContent>
          </TimelineItem>
        ))
      ) : (
        <h1>-</h1>
      )}
    </Timeline>
  );
}
