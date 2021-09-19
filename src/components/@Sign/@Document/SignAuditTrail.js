import CustomizedTimeline from "components/commons/Timeline";
import { useData } from "contexts/DataContext";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const SignAuditTrail = ({ fileData, placeFieldImages, scrollToPage }) => {
  const { getAuditTrail, auditTrails } = useData();
  const { t } = useTranslation();
  const [temp, setTemp] = useState(1);

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
        </div>
      </div>
      <div className="fix-below-button">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            scrollToPage(placeFieldImages?.length, "start");
            setTemp(placeFieldImages?.length);
          }}
        >
          {t("sign.placeFields.right.lastPage")}
        </button>
        <span>
          <select
            onChange={(e) => {
              setTemp(e.target.value);
              scrollToPage(e.target.value, "start");
            }}
            value={temp}
          >
            {placeFieldImages?.length > 0 &&
              placeFieldImages?.map((_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
          </select>
          <span>of {placeFieldImages?.length ?? 0} pages</span>
        </span>
      </div>
    </div>
  );
};

export default SignAuditTrail;
