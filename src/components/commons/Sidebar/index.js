import React from "react";
import { Link } from "@reach/router";

const landingData = [
  {
    isAvailable: true,
    name: "Sign",
    link: "/",
    icon: "",
  },
  {
    isAvailable: true,
    name: "Documents",
    link: "/docs",
    icon: "",
  },
  {
    isAvailable: true,
    name: "Settings",
    link: "/settings",
    icon: "",
  },
  {
    isAvailable: false,
    name: "Team",
    link: "/",
    icon: "",
  },
  {
    isAvailable: false,
    name: "Integration",
    link: "/",
    icon: "",
  },
  {
    isAvailable: false,
    name: "Analytic",
    link: "/",
    icon: "",
  },
];

const Sidebar = () => {
  return (
    <>
      {landingData?.map((datum) =>
        datum?.isAvailable ? (
          <Link to={datum?.link}>
            <div>
              <img src={""} alt={datum?.name} /> {datum?.name} .{" "}
            </div>
          </Link>
        ) : (
          <div>
            <img src={""} alt={datum?.name} /> {datum?.name} .{" "}
          </div>
        )
      )}
    </>
  );
};

export default Sidebar;
