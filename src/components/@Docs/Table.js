import React, { memo } from "react";
import { getMoment } from "../../helpers/transformer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { useHistory } from "react-router-dom";
import { DEFAULT, FRONTEND_URL } from "helpers/constant";

const NoDocument = ({ t }) => {
  const history = useHistory();
  return (
    <div className="no-document">
      <div onClick={() => history.push(FRONTEND_URL.me)}>
        <div className="icon">
          <LibraryAddIcon />
        </div>
        <div>{t("docs.table.clickToCreateNewDocument")}</div>
      </div>
    </div>
  );
};

const Table = ({
  displayedDocs,
  handleClickingComponent,
  t,
  activeDoc,
  getAuditTrail,
}) => {
  const getColorScore = (status, count = 99) => {
    if (status === "DRAFTING") {
      if (count === 99 || count === 0) return "var(--orange-color)";
      else return "white";
    }
    if (status === "WAITING") {
      if (count === 0) return "var(--tertiary-color)";
      if (count === 99 || count === 1) return "var(--orange-color)";
      else return "white";
    }
    if (status === "OUT") {
      if (count === 99 || count === 0) return "var(--orange-color)";
      else return "white";
    }
    if (status === "COMPLETED") {
      if (count === 99 || count === 0) return "var(--black-color)";
      return "var(--tertiary-color)";
    }
    return "white";
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <td className="">{t("docs.table.title")}</td>
            <td className="">{t("docs.table.status.text")}</td>
            <td className="">{t("docs.table.action.text")}</td>
            <td className="">{t("docs.table.SLA")}</td>
          </tr>
        </thead>
        <tbody>
          {displayedDocs &&
            displayedDocs?.length > 0 &&
            displayedDocs?.map((component, i) => (
              <tr
                className={`col col-xl-4 col-sm-12 sign-area ${
                  activeDoc?.value?.id === component?.id ? "bg-ok" : ""
                }`}
                key={i}
                onClick={() => {
                  getAuditTrail(component?.uid);
                  activeDoc?.set(component);
                }}
              >
                <td>
                  <span
                    className={`cursor-pointer`}
                    style={{
                      fontSize: "0.75rem",
                    }}
                  >
                    {component?.filename ?? DEFAULT.DOC_FILE_NAME}
                  </span>
                </td>
                <td>
                  <div className="progress-bag">
                    <div className="progression">
                      <div className="full-bar" />
                      <div className="partial-bar" />
                      {[0, 1, 2].map((a) => (
                        <div
                          key={a}
                          className={`score score-${a}`}
                          style={{
                            backgroundColor: getColorScore(
                              component?.status,
                              a
                            ),
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                    }}
                  >
                    {t(`docs.table.status.${component?.status}`)}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleClickingComponent(component)}
                    className="btn btn-sm"
                    style={{
                      width: "5rem",
                      fontSize: "0.7rem",
                      paddingLeft: "0",
                      paddingRight: "0",
                      backgroundColor: getColorScore(component?.status),
                    }}
                  >
                    {t(`docs.table.action.${component?.status}`)}
                  </button>
                </td>
                <td
                  style={{
                    fontSize: "0.75rem",
                  }}
                >
                  {getMoment(component?.createdAt)}
                </td>
                <td>
                  <ChevronRightIcon />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!displayedDocs && <NoDocument t={t} />}
    </>
  );
};

export default memo(Table);
