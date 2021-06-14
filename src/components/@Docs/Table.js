import React from "react";
import { getMoment } from "../../helpers/transformer";

const Table = ({ displayedDocs, handleClickingComponent, t, activeDoc }) => {
  return (
    <table>
      <thead>
        <tr>
          <td className="lead">{t("docs.table.title")}</td>
          <td className="lead">{t("docs.table.status.text")}</td>
          <td className="lead">{t("docs.table.action.text")}</td>
          <td className="lead">{t("docs.table.SLA")}</td>
        </tr>
      </thead>
      {console.log(displayedDocs?.value)}
      <tbody>
        {displayedDocs?.value &&
          displayedDocs?.value?.length > 0 &&
          displayedDocs?.value?.map((component) => (
            <tr
              className="col col-xl-4 col-sm-12 sign-area"
              key={component?.id}
            >
              <td>
                <span
                  className={`cursor-pointer ${
                    activeDoc?.value?.id === component?.id ? "bold" : ""
                  } `}
                  onClick={() => activeDoc?.set(component)}
                >
                  {component?.filename ?? "Jones Napoleon Autumn"}
                </span>
              </td>
              <td>{component?.userid}</td>
              <td>
                <button
                  onClick={() => handleClickingComponent(component)}
                  className="btn btn-primary btn-sm"
                >
                  {component?.userid}
                </button>
              </td>
              <td>{getMoment(component?.createdAt)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
