import { getDocumentList } from "api/data";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { useSnackbar } from "./SnackbarContext";

export const DataContext = createContext({});
export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const { addSnackbar } = useSnackbar();
  const { isLoggedIn } = useAuth();
  const [documents, setDocuments] = useState(false);

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await getDocumentList();
      if (res) {
        setDocuments(res);
      }
    } catch (e) {
      addSnackbar(String(e));
    }
  }, [setDocuments, addSnackbar]);

  useEffect(() => isLoggedIn && fetchDocuments(), [isLoggedIn, fetchDocuments]);

  const appendDocument = useCallback(
    (newDocs) => {
      if (!documents) setDocuments([newDocs]);
      else setDocuments([...documents, newDocs]);
    },
    [setDocuments, documents]
  );

  const getDocumentData = useCallback(
    (fileId) => {
      try {
        if (!documents) throw new Error("No document");
        else {
          const availableDocs = documents?.filter((doc) => doc.id === fileId);
          if (availableDocs.length === 0) throw new Error("No document");
          return availableDocs[0];
        }
      } catch (e) {
        return {};
      }
    },
    [documents]
  );

  return (
    <DataContext.Provider
      value={{
        documents,
        appendDocument,
        getDocumentData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
