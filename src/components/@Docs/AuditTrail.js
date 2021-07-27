import React from "react";
import { useTranslation } from "react-i18next";

const AuditTrail = ({ activeDoc }) => {
  const { t } = useTranslation();
  return (
    <div className="audit-trail">
      <div className="item-between">
        <strong className="pt-3">{t("docs.auditTrail.title")}</strong>
        {/* <div>
          <button className="btn btn-primary btn-sm">
            {t("general.view")}
          </button>
        </div> */}
      </div>
      <div className=""></div>
    </div>
  );
};

export default AuditTrail;
