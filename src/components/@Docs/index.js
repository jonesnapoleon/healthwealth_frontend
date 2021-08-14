import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../../contexts/DataContext";
import { useFormInput, useRefreshedData } from "../../helpers/hooks";
import { getAllDocs } from "../../api/docs";
// import { ReactComponent as SearchIcon } from "../../assets/bnw/Search Icon.svg";
import Table from "./Table";
import AuditTrail from "./AuditTrail";
import "./docs.scss";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { useSnackbar } from "contexts/SnackbarContext";
import { DOC, DRAFT_STATUS } from "helpers/constant";

const Docs = () => {
  const { t } = useTranslation();
  const { handle_data_docs, docs, setDocs, getAuditTrail, auditTrails } =
    useData();
  const { addSnackbar } = useSnackbar();
  const query = useFormInput("");
  const history = useHistory();

  const { value: displayedDocs, set: setDisplayedDocs } = useRefreshedData(
    docs ?? []
  );
  // const setDisplayedDocs = displayedDocs.set;
  const activeDoc = useRefreshedData(false);

  const fetchingDocs = useCallback(async () => {
    if (!docs) {
      try {
        const res = await getAllDocs();
        if (res) {
          setDocs(res);
        }
      } catch (err) {
        addSnackbar(String(err));
      }
    }
  }, [setDocs, docs, addSnackbar]);

  useEffect(() => {
    fetchingDocs();
  }, [fetchingDocs]);

  const handleClickingComponent = useCallback(
    (obj) => {
      console.log(obj);
      const key = String(obj?.signType).toLowerCase();
      if (obj?.status !== DRAFT_STATUS.DRAFTING) return;
      if (key !== DOC.me) {
        handle_data_docs(true, key, "fileData", obj);
        if (obj?.nextflow && obj.nextflow?.length === 0) {
          history.push(`${key}#${0}`);
        }
        if (obj?.nextflow && obj.nextflow?.length > 0) {
          history.push(`${key}#${1}`);
        }
      }
      if (key === DOC.me) {
        handle_data_docs(true, key, "fileData", obj);
        if (obj?.nextflow && obj.nextflow?.length === 0) {
          history.push(`${key}#${0}`);
        }
        if (obj?.nextflow && obj.nextflow?.length > 0) {
          history.push(`${key}#${1}`);
        }
      }
    },
    [handle_data_docs, history]
  );

  const trimNow = useCallback(
    (trimmedQuery) => {
      let temp = docs?.filter((doc) =>
        String(doc?.filename)?.toLowerCase()?.includes(trimmedQuery)
      );
      setDisplayedDocs(temp);
    },
    [setDisplayedDocs, docs]
  );

  const displayAll = useCallback(() => {
    setDisplayedDocs(docs);
  }, [setDisplayedDocs, docs]);

  useEffect(() => {
    const trimmedQuery = String(query?.value).trim().toLowerCase();
    if (trimmedQuery.length > 1) trimNow(trimmedQuery);
    if (trimmedQuery.length === 0) displayAll();
  }, [query?.value, trimNow, displayAll]);

  // console.log(displayedDocs);
  return (
    <div className="docs mt-2">
      {/* <label class="formlabel">
          <span>{t("form.search")}</span>
        </label> */}
      {/* <div className="">
        <button className="btn btn-secondary" onClick={filterDocs}></button>
      </div> */}

      <div className="row">
        <div className="col col-lg-8 col-12">
          <div className="formarea">
            <input className="form-input search-bar" {...query} />
            <span className="search-bar-icon">
              <SearchIcon />
            </span>
          </div>
          <Table
            handleClickingComponent={handleClickingComponent}
            displayedDocs={displayedDocs}
            activeDoc={activeDoc}
            t={t}
            getAuditTrail={getAuditTrail}
          />
        </div>
        <div className="col col-lg-4 col-12 position-relative">
          <AuditTrail activeDoc={activeDoc} auditTrails={auditTrails} />
        </div>
      </div>
    </div>
  );
};

export default Docs;
