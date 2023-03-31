import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Helmet} from "react-helmet-async";
import {RouteObject} from "react-router/dist/lib/context";
import {LoaderFunction, useLoaderData} from "react-router-dom";

const App: React.FunctionComponent = () => {
  const { initialCount } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [count, setCount] = useState<number>(initialCount || 0);
  const title = "Vite + React";

  return (
    <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="App">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>{title}</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
    </>
  )
}

export default App;

export interface RouteAppParams {
  initialCount?: string;
}
const loader: LoaderFunction = async ({ params}) => {
  const { initialCount } = params as RouteAppParams;
  return {
    initialCount: initialCount ? parseInt(initialCount) : 0
  };
}

export const RouteApp: RouteObject = {
  path: `:initialCount?`,
  element: <App />,
  loader
};
