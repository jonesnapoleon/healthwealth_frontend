import { useSnackbar } from "contexts/SnackbarContext";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@material-ui/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ fileUrl }) => {
  const [isError, setIsError] = useState(false);
  const { addSnackbar } = useSnackbar();

  return isError ? (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => window.open(fileUrl, "_blank")}
    >
      Open PDF
    </Button>
  ) : (
    <Document
      file={{
        url: fileUrl,
        httpHeaders: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "X-CustomHeader": "40359820958024350238508234",
        },
        withCredentials: true,
      }}
      onLoadSuccess={() => {}}
      onLoadError={(e) => {
        setIsError(true);
        addSnackbar(String(e));
      }}
      options={{
        workerSrc: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`,
      }}
    >
      <Page pageNumber={1} />
    </Document>
  );
};

export default PDFViewer;
