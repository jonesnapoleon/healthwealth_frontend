import React from "react";
import RouteWrapper from "./RouteWrapper";
import StyleProvider from "contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "react-query";
import DataProvider from "contexts/DataContext";
import SnackbarProvider from "contexts/SnackbarContext";
import AuthProvider from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
// import LargeScreen from "components/Common/LargeScreen";
// import { useWidth } from "utils/hooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

const App = () => {
  return (
    <StyleProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <AuthProvider>
              <DataProvider>
                <RouteWrapper />
                {/* {isLargeScreen ? <LargeScreen /> : <RouteWrapper />} */}
              </DataProvider>
            </AuthProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StyleProvider>
  );
};

export default App;
