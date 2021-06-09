import React from "react";

const AuditTrail = ({ activeDoc, t }) => {
  return (
    <div className="audit-trail">
      <div className="item-between">
        <div className="lead">{t("docs.auditTrail.title")}</div>
        <div>
          <button className="btn btn-primary btn-sm">
            {t("general.view")}
          </button>
        </div>
      </div>
      <div className="">{/* TODO JOJO */}</div>
    </div>
  );
};

export default AuditTrail;
