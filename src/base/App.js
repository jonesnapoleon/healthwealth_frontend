import React from "react";
import RouteWrapper from "./RouteWrapper";
import StyleProvider from "contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "react-query";
import DataProvider from "contexts/DataContext";
import SnackbarProvider from "contexts/SnackbarContext";
import AuthProvider from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import TopNavigation from "components/Skeleton/TopNavigation";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <AuthProvider>
                <DataProvider>
                  <TopNavigation />
                  <RouteWrapper />
                </DataProvider>
              </AuthProvider>
            </LocalizationProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StyleProvider>
  );
};

export default App;
