import React, { createContext, useState, useCallback, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export const SnackbarContext = createContext(null);
export const useSnackbar = () => useContext(SnackbarContext);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarProvider = ({ children }) => {
  const DURATION = 3000;
  const [snackbar, setSnackbar] = useState({
    show: false,
  });

  const removeSnackbar = () => {
    setSnackbar({ show: false });
  };

  const addSnackbar = (message, type = "error") => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => setSnackbar({ show: false }), DURATION);
  };

  const alertContextValue = {
    alert,
    addSnackbar: useCallback((message, type) => addSnackbar(message, type), []),
    removeSnackbar: useCallback(() => removeSnackbar(), []),
  };

  return (
    <SnackbarContext.Provider value={alertContextValue}>
      {children}
      {snackbar.show && (
        <Snackbar
          open={snackbar?.show}
          autoHideDuration={DURATION}
          onClose={removeSnackbar}
        >
          <Alert onClose={removeSnackbar} severity={snackbar?.type}>
            {snackbar?.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
