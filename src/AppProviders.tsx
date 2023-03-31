import React from "react";
import { HelmetProvider } from 'react-helmet-async';

interface AppProvidersProps {
    children?: React.ReactNode;
}
const AppProviders: React.FunctionComponent<AppProvidersProps> = ({children}) => {
    return (
        <>
            {/*
              Errors indicating you might be missing HelmetProvider:
              Dispatcher.js:60 Uncaught TypeError: Cannot read properties of undefined (reading 'add')
              *react-dom.development.js:18687 The above error occurred in the <HelmetDispatcher> component:
            */}
            <HelmetProvider>
                {children}
            </HelmetProvider>
        </>
    )
}

export default AppProviders;
