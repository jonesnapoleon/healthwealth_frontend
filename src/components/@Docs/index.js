import React from "react";
import { Link } from "@reach/router";
import "./docs.css";
import { useTranslation } from "react-i18next";
import { useData } from "../../contexts/DataContext";

const Docs = () => {
  const { t } = useTranslation();
  const { docs } = useData();

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
        <table>
          {docs?.map((component) => (
            <tr
              className="col col-xl-4 col-sm-12 sign-area"
              key={component?.title}
            >
              <div className="item-center">
                <div className="lead">{component?.title}</div>
                <div className="desc">{component?.desciption}</div>
                <div className="button">
                  <Link className="btn-primary" to={component?.dest}>
                    {component?.ctaText}
                  </Link>
                </div>
              </div>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default Docs;
