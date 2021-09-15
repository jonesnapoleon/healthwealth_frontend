import CustomizedTimeline from "components/commons/Timeline";
import { useData } from "contexts/DataContext";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

const SignAuditTrail = ({ fileData }) => {
  const { getAuditTrail, auditTrails } = useData();
  const { t } = useTranslation();

  useEffect(() => {
    getAuditTrail(fileData?.uid);
  }, [fileData, getAuditTrail]);

  const auditData = useMemo(
    () => auditTrails[fileData?.uid],
    [fileData, auditTrails]
  );

  return (
    <div className="right-sidebar position-fixed">
      <div className="audit-trail">
        <div className="item-between">
          <strong className="">{t("docs.auditTrail.title")}</strong>
        </div>
        <div className="wrap-audit">
          <div className="pt-1 pb-2" style={{ fontSize: "0.8rem" }}>
            {fileData?.filename}
          </div>
          <CustomizedTimeline data={auditData} />
          {/* <button className="btn btn-primary btn-sm">
            {t("general.view")}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SignAuditTrail;
