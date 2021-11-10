import { useData } from "contexts/DataContext";
import React from "react";
import { useParams } from "react-router";

const DocumentDetail = () => {
  const { fileId } = useParams();

  const { getDocumentData } = useData();
  const document = getDocumentData(fileId);

  return <div>{document?.fileName}</div>;
};

export default DocumentDetail;
