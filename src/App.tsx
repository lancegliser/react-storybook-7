import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Helmet } from "react-helmet-async";
import { RouteObject } from "react-router/dist/lib/context";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const App: React.FunctionComponent = () => {
  const { initialCount } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const [count, setCount] = useState<number>(initialCount || 0);
  const title = "Vite + React";

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <Typography variant={"h1"}>{title}</Typography>
        <Box sx={{ p: 2 }}>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={() => setCount((count) => count + 1)}
            sx={{ mb: 2 }}
          >
            count is {count}
          </Button>
          <Typography>
            Edit <code>src/App.tsx</code> and save to test HMR
          </Typography>
        </Box>
        <Typography color={"text.secondary"}>
          Click on the Vite and React logos to learn more
        </Typography>
      </div>
    </>
  );
};

export default App;

export interface RouteAppParams {
  initialCount?: string;
}
const loader: LoaderFunction = async ({ params }) => {
  const { initialCount } = params as RouteAppParams;
  return {
    initialCount: initialCount ? parseInt(initialCount) : 0,
  };
};

export const RouteApp: RouteObject = {
  path: `:initialCount?`,
  element: <App />,
  loader,
};
