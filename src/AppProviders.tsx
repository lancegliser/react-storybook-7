import React from "react";
import { HelmetProvider } from 'react-helmet-async';

interface AppProvidersProps {
    children?: React.ReactNode;
}
const AppProviders: React.FunctionComponent<AppProvidersProps> = ({children}) => {
    return (
        <HelmetProvider>
            {children}
        </HelmetProvider>
    )
}

export default AppProviders;
