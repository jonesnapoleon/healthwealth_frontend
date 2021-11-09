import React, { createContext, useContext } from "react";

export const DataContext = createContext({});
export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  // const [, ] = useState({});
  // const [searchResults, setSearchResults] = useState({});
  // const [dataDetails, setDataDetails] = useState({});

  // const addDataDetail = useCallback((DataDetail) => {
  //   setDataDetails((state) => {
  //     return { ...state, [String(DataDetail.id)]: DataDetail };
  //   });
  // }, []);

  return (
    <DataContext.Provider
      value={
        {
          // data,
          // setDatas,
          // searchResults,
          // setSearchResults,
          // DataDetails,
          // addDataDetail,
          // currentOrder,
          // setCurrentOrder,
        }
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
