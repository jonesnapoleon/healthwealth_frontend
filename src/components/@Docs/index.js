import React, { useEffect } from "react";
import { Link } from "@reach/router";
// import { useDispatch } from "react-redux";
import SignList from "../Lists/SignList";
import SignedList from "../Lists/SignedList";
// import { resetDocToView } from "../ViewDocument/ViewDocumentSlice";
// import { resetDocToSign } from "../SignDocument/SignDocumentSlice";
import "./docs.css";
import { useTranslation } from "react-i18next";

// const TABS = [
//   { text: "My Documents" },
//   { text: "Need Approval" },
//   { text: "Need Signature" },
// ];

const Docs = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(resetDocToView());
  //   dispatch(resetDocToSign());
  // }, [dispatch]);
  const signComponents = [
    {
      icon: "",
      title: t("landing.me.title"),
      ctaText: t("landing.me.ctaText"),
      desciption: t("landing.me.desc"),
      dest: "/me",
    },
    {
      icon: "",
      title: t("landing.all.title"),
      ctaText: t("landing.all.ctaText"),
      desciption: t("landing.all.desc"),
      dest: "/all",
    },
    {
      icon: "",
      title: t("landing.req.title"),
      ctaText: t("landing.req.ctaText"),
      desciption: t("landing.req.desc"),
      dest: "/req",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex);
  };

  const getContent = () => {
    if (activeIndex === 0) return <SignedList />;
    if (activeIndex === 1) return <SignedList />;
    if (activeIndex === 2) return <SignList />;
  };

  const name = "John";
  return (
    <>
      <div>
        <input className="form-area" />
      </div>
      <strong className="hello lead">
        {t("landing.hello")}, {name}!
      </strong>

      <div className="row">
        {signComponents?.map((component) => (
          <div
            className="col col-xl-4 col-sm-12 sign-area"
            key={component?.title}
          >
            <div className="item-centery">
              <img
                src={
                  "https://jonesnapoleon.com/static/media/Jones.14fc7267.png" ??
                  component?.icon
                }
                alt=""
              />
              <div className="lead">{component?.title}</div>
              <div className="desc">{component?.desciption}</div>
              <div className="button">
                <Link className="btn-primary" to={component?.dest}>
                  {component?.ctaText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Docs;
