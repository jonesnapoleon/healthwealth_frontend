import React, { useCallback, useEffect, useState } from "react";
import { Link } from "@reach/router";
import "./docs.css";
import { useTranslation } from "react-i18next";
import { useData } from "../../contexts/DataContext";
import { useFormInput } from "../../helpers/hooks";
import { getAllDocs } from "../../api/auth";
import Snackbar from "../commons/Snackbar";
import searchIcon from "../../assets/images/Search Icon.svg";

const Docs = () => {
  const { t } = useTranslation();
  const { docs, setDocs } = useData();
  const query = useFormInput("");
  const [error, setError] = useState(false);

  const [displayedDocs, setDisplayedDocs] = useState(docs ?? []);

  const fetchingDocs = useCallback(async () => {
    if (!docs) {
      try {
        const res = await getAllDocs();
        console.log(res);
        if (res) {
          setDocs(res);
        }
      } catch (err) {
        setError(String(err));
        setTimeout(() => setError(false), 3000);
      }
    }
  }, [setDocs, docs]);

  useEffect(() => {
    fetchingDocs();
  }, [fetchingDocs]);

  useEffect(() => {
    const trimmedQuery = String(query?.value).trim();
    const filterDocs = () => {
      const temp = docs?.filter((doc) => doc?.name.includes(trimmedQuery));
      setDisplayedDocs(temp);
    };
    if (trimmedQuery !== "") {
      filterDocs();
    }
  }, [query?.value, docs]);

  return (
    <div className="docs">
      {error && <Snackbar text={error} />}

      <div className="formarea">
        <input className="form-input search-bar" {...query} />
        <span className="search-bar-icon">
          <img src={searchIcon} alt="" />
        </span>
      </div>
      {/* <label class="formlabel">
          <span>{t("form.search")}</span>
        </label> */}
      {/* <div className="">
        <button className="btn btn-secondary" onClick={filterDocs}></button>
      </div> */}

      <div className="row">
        <table>
          {displayedDocs &&
            displayedDocs?.map((component) => (
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
    </div>
  );
};

export default Docs;
