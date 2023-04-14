import React, { Reducer, useEffect, useReducer, useRef } from "react";

export interface ILeaderBoardContext {
  query: LeaderBoardQuery;
}

const LeaderBoardContext = React.createContext<ILeaderBoardContext>(
  // This is definitional only. The provider creates the real values
  {} as ILeaderBoardContext
);
LeaderBoardContext.displayName = "LeaderBoardContext";

export default LeaderBoardContext;

interface Props {
  children: React.ReactNode;
}
export const LeaderBoardContextProvider = (({ children }) => {
  const [query, dispatch] = useReducer(queryReducer, queryDefaultState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      // Guess we're stuck
      if (query.error) {
        return;
      }

      if (!query.data) {
        dispatch({ type: "setLoading" });

        setTimeout(() => {
          // Some initial see data
          const rows: LeaderBoardRow[] = [
            { age: getAge(), name: "Roberto", score: Math.random() * 5 },
            { age: getAge(), name: "Lance", score: Math.random() * 5 },
            { age: getAge(), name: "Petra", score: Math.random() * 5 },
          ];
          dispatch({
            type: "setData",
            data: {
              rows,
            },
          });
        }, 500);
        return;
      }

      // Data changes most of the time
      const value = Math.random();
      if (value >= 0.04) {
        dispatch({
          type: "setData",
          data: {
            rows: query.data!.rows.map((row) => ({
              ...row,
              score: (row.score || 0) + Math.random() * 10,
            })),
          },
        });
        return;
      }

      // But sometimes it blows up when you really want it
      clearTimeout(timeoutRef.current);
      dispatch({
        type: "setError",
        error: new Error("Network error: 429"),
      });
    }, Math.max(300, Math.random() * 600));

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [query]);

  return (
    <LeaderBoardContext.Provider
      value={{
        query,
      }}
    >
      {children}
    </LeaderBoardContext.Provider>
  );
}) as React.FunctionComponent<Props>;

// A rough approximation of Apollo client's `useQuery` handling
interface LeaderBoardQuery {
  data?: {
    rows: LeaderBoardRow[];
  };
  loading?: boolean;
  error?: Error;
}
interface LeaderBoardRow {
  name: string;
  age: number;
  score?: number;
}

const queryDefaultState: LeaderBoardQuery = {
  data: undefined,
  loading: false,
  error: undefined,
};
type LeaderBoardQueryAction =
  | { type: "reset" }
  | { type: "setLoading" }
  | { type: "setError"; error: LeaderBoardQuery["error"] }
  | { type: "setData"; data: LeaderBoardQuery["data"] };

const queryReducer: Reducer<LeaderBoardQuery, LeaderBoardQueryAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "reset":
      return queryDefaultState;
    case "setLoading":
      return { ...queryDefaultState, loading: true };
    case "setError":
      return { loading: false, data: undefined, error: action.error };
    case "setData":
      return { loading: false, data: action.data, error: undefined };
  }
};

const getAge = () => Math.round(Math.max(25, Math.random() * 100));
