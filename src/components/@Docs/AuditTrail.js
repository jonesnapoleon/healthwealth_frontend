import CustomizedTimeline from "components/commons/Timeline";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const AuditTrail = ({ activeDoc, auditTrails }) => {
  const { t } = useTranslation();
  const auditData = useMemo(
    () => auditTrails[activeDoc?.value?.uid],
    [activeDoc, auditTrails]
  );

  console.log(auditData);
  return (
    <div className="audit-trail">
      <div className="item-between">
        <strong className="">{t("docs.auditTrail.title")}</strong>
      </div>
      <div className="wrap-audit">
        <div className="pt-1 pb-2">{activeDoc?.value?.filename}</div>
        <CustomizedTimeline data={auditData} />
        {/* <button className="btn btn-primary btn-sm">
            {t("general.view")}
          </button> */}
      </div>
    </div>
  );
};

export default AuditTrail;
