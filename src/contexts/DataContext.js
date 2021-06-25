import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";

export const DataContext = createContext({});
export const useData = () => useContext(DataContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        [action.key]: { ...state[action.key], [action.attr]: action.data },
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        [action.key]: { ...state[action.key], [action.attr]: false },
      };
    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const [dataDocs, dispatchDataDocs] = useReducer(reducer, {
    me: { docs: false, fileData: false, signers: false, copies: false },
    all: { docs: false, fileData: false, signers: false, copies: false },
    request: { docs: false, fileData: false, signers: false, copies: false },
  });
  const [docs, setDocs] = useState(false);

  const getFileData = useCallback(
    (atr) => dataDocs?.[atr]?.fileData,
    [dataDocs]
  );

  const getItemData = useCallback(
    (atr, item) => dataDocs?.[atr]?.[item],
    [dataDocs]
  );

  const handle_data_docs = (isAdd, key, attr, data) =>
    dispatchDataDocs({
      type: isAdd ? "ADD_ITEM" : "REMOVE_ITEM",
      key,
      attr,
      data,
    });

  return (
    <DataContext.Provider
      value={{
        docs,
        setDocs,
        dataDocs,
        handle_data_docs,
        getFileData,
        getItemData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
