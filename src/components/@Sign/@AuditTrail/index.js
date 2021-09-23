import React, { useEffect, useCallback, useState } from "react";
import { getDocumentAuditTrail } from "api/docs";
import { useSnackbar } from "contexts/SnackbarContext";
import { FRONTEND_URL } from "helpers/constant";
import { useTranslation } from "react-i18next";
import { Link, useParams, useHistory } from "react-router-dom";
import logoUrl from "../../../assets/bnw/Company Logo@2x.png";

import "./main.scss";
import { makeStyles } from "@material-ui/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import DoneIcon from "@material-ui/icons/Done";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import { getReadableTimestamp } from "helpers/transformer";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

const AuditTrailTop = () => (
  <div className="container mt-3 mb-3">
    <Link to={FRONTEND_URL.base} className="profileLink">
      <img className="logo" src={logoUrl} alt="" />
    </Link>
  </div>
);

const SummaryArea = ({ data, t }) => {
  // console.log(data);
  return (
    <div>
      <div className="full-long-blue">{t("sign.documentAuditTrail.hs")}</div>
      <div className="detail-wrapper">
        <div>
          {t("sign.documentAuditTrail.title")}: {data?.filename}
        </div>
        <div>
          {t("sign.documentAuditTrail.docPages")}: {data?.numPages}
        </div>
        <div>
          {t("sign.documentAuditTrail.owner")}: {data?.userEmail}
        </div>
        <div>
          {t("sign.documentAuditTrail.recipients")}:{" "}
          {data?.recipient?.length ?? 1}
        </div>
        {data &&
          data?.recipient?.map((user, i) => (
            <div>
              {t("sign.documentAuditTrail.recipient")} {i + 1}: {user?.email}
            </div>
          ))}
        <div>
          {t("sign.documentAuditTrail.createdAt")}:{" "}
          {getReadableTimestamp(data?.createdAt)}
        </div>
        <div>
          {t("sign.documentAuditTrail.completedAt")}:{" "}
          {getReadableTimestamp(data?.completedAt)}
        </div>
      </div>
    </div>
  );
};
const Recipient = ({ t, data }) => {
  return (
    <div>
      <div className="full-long-blue">{t("sign.documentAuditTrail.hr")}</div>
      <div className="detail-wrapper">
        <table>
          <thead>
            <tr>
              {["acc", "sta", "inf"].map((a) => (
                <td key={a}>{t(`sign.documentAuditTrail.${a}`)}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((datum, i) => (
                <tr key={i}>
                  <td>{datum?.userAgent}</td>
                  <td>{datum?.userAgent}</td>
                  <td
                    style={{
                      textAlign: "left",
                      paddingLeft: ".5rem",
                      paddingRight: ".5rem",
                    }}
                  >
                    <small>
                      <div>{}</div>
                    </small>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
  },
  item: {
    width: "100%",
    "&:before": {
      flex: "unset",
      padding: "0",
    },
  },
  dot: {
    fontSize: ".6rem",
    margin: ".2rem",
  },
}));

const RealAuditTrail = ({ t, data }) => {
  const classes = useStyles();

  return (
    <div>
      <div className="full-long-blue">{t("sign.documentAuditTrail.ha")}</div>
      <div className="detail-wrapper">
        <Timeline className={classes.root}>
          <TimelineItem className={classes.item} style={{ minHeight: "unset" }}>
            <TimelineSeparator>
              <TimelineDot variant="outlined" style={{ visibility: "hidden" }}>
                <DoneIcon className={classes.dot} />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent className="timeliner-text">
              {["account", "activity", "ip", "useAgent", "timestamp"].map(
                (a, i) => (
                  <div
                    className="special-header"
                    style={{
                      textAlign: "center",
                      borderLeft: i === 0 ? "unset" : "1px solid black",
                      width: i === 3 ? "28%" : "18%",
                    }}
                    key={a}
                  >
                    {t(`sign.documentAuditTrail.${a}`)}
                  </div>
                )
              )}
            </TimelineContent>
          </TimelineItem>
          {data &&
            data?.map((datum, i) => (
              <TimelineItem className={classes.item} key={i}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined">
                    <DoneIcon className={classes.dot} />
                  </TimelineDot>
                  {i !== data?.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent className="timeliner-text">
                  <div>{datum?.fullname}</div>
                  <div>
                    {t(
                      `sign.documentAuditTrail.template.${
                        String(datum?.action).toLowerCase() ?? "sign"
                      }`
                    )}
                  </div>
                  <div>{datum?.ip}</div>
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      width: "28%",
                    }}
                  >
                    <small>{datum?.userAgent}</small>
                  </div>
                  <div>
                    {getReadableTimestamp(datum?.updatedAt).split(" ")[0]}
                    <br />
                    {getReadableTimestamp(datum?.updatedAt).split(" ")[1]}
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      </div>
    </div>
  );
};

const DocumentAuditTrail = () => {
  const { t } = useTranslation();
  const { addSnackbar } = useSnackbar();
  const { fileUId = null } = useParams();
  const { push } = useHistory();

  const [auditTrail, setAuditTrail] = useState(false);
  const [loading, setLoading] = useState(false);

  const download = () => {
    // const doc = document.getElementById("defjrhglefwjrh");
    // const coor = doc?.getBoundingClientRect();
    window.print();
    return;
    // console.log(coor);
    // html2canvas(doc).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF();
    //   pdf.addImage(
    //     imgData,
    //     "JPEG",
    //     coor?.x,
    //     coor?.y,
    //     coor?.width,
    //     coor?.height
    //   );
    //   // pdf.output('dataurlnewwindow');
    //   pdf.save(
    //     `${String(auditTrail?.doc?.filename).split(".")[0] ?? "file"}.pdf`
    //   );
    // });
  };
  console.log(auditTrail);

  const fetchFileInfo = useCallback(async () => {
    if (!fileUId || fileUId === undefined) {
      push(`${FRONTEND_URL.docs}`);
      return;
    }
    if (loading) return;

    try {
      setLoading(true);
      const res = await getDocumentAuditTrail(fileUId);
      if (res) {
        setAuditTrail(res);
        setLoading(false);
      }
    } catch (e) {
      addSnackbar(String(e));
      setLoading(false);
    }
  }, [addSnackbar, fileUId, loading, push]);

  useEffect(() => {
    fetchFileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="docs-audit-trail">
      <div id="defjrhglefwjrh">
        <AuditTrailTop />
        <div className="container">
          <SummaryArea data={auditTrail?.doc} t={t} />
          <div className="mt-4" />
          <Recipient data={auditTrail?.auditTrails} t={t} />
          <div className="mt-4" />
          <RealAuditTrail data={auditTrail?.auditTrails} t={t} />
        </div>
      </div>
      <div className="mt-4 text-center">
        <button className="btn btn-primary" onClick={download}>
          {t("general.download")}
        </button>
      </div>
      <div className="mt-4" />
    </div>
  );
};

export default DocumentAuditTrail;
