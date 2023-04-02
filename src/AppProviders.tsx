import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { CssBaseline } from "@mui/material";
import dark from "./themes/dark";

interface AppProvidersProps {
  children?: React.ReactNode;
}
const AppProviders: React.FunctionComponent<AppProvidersProps> = ({
  children,
}) => {
  return (
    <>
      {/*
              Errors indicating you might be missing HelmetProvider:
              Dispatcher.js:60 Uncaught TypeError: Cannot read properties of undefined (reading 'add')
              *react-dom.development.js:18687 The above error occurred in the <HelmetDispatcher> component:
            */}
      <HelmetProvider>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={dark}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </HelmetProvider>
    </>
  );
};

export default AppProviders;

const muiCache = createCache({
  key: "mui",
  prepend: true,
});
