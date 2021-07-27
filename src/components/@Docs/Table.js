import React, { memo } from "react";
import { getMoment } from "../../helpers/transformer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Table = ({ displayedDocs, handleClickingComponent, t, activeDoc }) => {
  return (
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
          displayedDocs?.map((component) => (
            <tr
              className={`col col-xl-4 col-sm-12 sign-area ${
                activeDoc?.value?.id === component?.id ? "bg-ok" : ""
              }`}
              key={component?.id}
              onClick={() => activeDoc?.set(component)}
            >
              <td>
                <span className={`cursor-pointer  `}>
                  {component?.filename ?? "Untitled 225"}
                </span>
              </td>
              <td>
                <div>
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
                <span>{t(`docs.table.status.${component?.status}`)}</span>
              </td>
              <td>
                <button
                  onClick={() => handleClickingComponent(component)}
                  className="btn btn-primary btn-sm"
                >
                  {t(`docs.table.action.${component?.status}`)}
                </button>
              </td>
              <td>{getMoment(component?.createdAt)}</td>
              <td>
                <ChevronRightIcon />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default memo(Table);
