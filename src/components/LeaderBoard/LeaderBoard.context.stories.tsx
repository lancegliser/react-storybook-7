import type { Meta, StoryObj } from "@storybook/react";
import LeaderBoard from "./LeaderBoard";
import React, { Reducer, useEffect, useReducer, useRef } from "react";
import LeaderBoardContext, { LeaderBoardQuery } from "./LeaderBoard.context";

const getAge = () => Math.round(Math.max(25, Math.random() * 100));

const meta = {
  component: LeaderBoardContext.Provider,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/lQXYQZMy2xRcwL7CM9dbGY/MUI-for-Figma-(Material-UI%2C-Joy-UI%2C-MUI-X)-(Community)?node-id=6105%3A76331&t=8ZXCTR72Vs9TxOh3-1",
    },
  },
  render: (args) => (
    <LeaderBoardContext.Provider {...args}>
      <LeaderBoard />
    </LeaderBoardContext.Provider>
  ),
  args: {
    value: {
      query: {
        data: {
          rows: [
            { age: getAge(), name: "Roberto", score: 2 },
            { age: getAge(), name: "Lance", score: Math.random() * 5 },
            { age: getAge(), name: "Petra", score: 10_000 },
          ],
        },
        error: undefined,
        loading: false,
      },
    },
  },
} satisfies Meta<
  typeof LeaderBoardContext.Provider & { changeInterval?: number }
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPreviousScores: Story = {
  args: {
    value: {
      query: {
        data: {
          rows: [
            { age: getAge(), name: "Roberto", score: 2, previousScore: 1.5 },
            {
              age: getAge(),
              name: "Lance",
              score: Math.random() * 5,
              previousScore: 5,
            },
            { age: getAge(), name: "Petra", score: 4, previousScore: 3.5 },
          ],
        },
      },
    },
  },
};

export const WithChangingScores: Story = {
  render: (args) => {
    // @ts-expect-error I defined it below, shoosh.
    const changeInterval = args.changeInterval;
    return <DynamicLeaderBoardContext changeInterval={changeInterval} />;
  },
  args: {
    changeInterval: 3000,
  } as Story["args"] & DynamicLeaderBoardContextProps,
};

interface DynamicLeaderBoardContextProps {
  changeInterval: number;
}
const DynamicLeaderBoardContext: React.FunctionComponent<
  DynamicLeaderBoardContextProps
> = ({ changeInterval }) => {
  const [query, dispatch] = useReducer(queryReducer, queryDefaultState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      // Guess we're stuck
      if (query.error) {
        return;
      }

      // Data changes
      dispatch({
        type: "setData",
        data: {
          rows: query.data!.rows.map((row) => ({
            ...row,
            score: Math.random() * 5,
            previousScore: row.score,
          })),
        },
      });
    }, changeInterval);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [query, changeInterval]);

  return (
    <LeaderBoardContext.Provider value={{ query }}>
      <LeaderBoard />
    </LeaderBoardContext.Provider>
  );
};

// A rough approximation of Apollo client's `useQuery` handling
const queryDefaultState: LeaderBoardQuery = {
  data: {
    rows: [
      { age: getAge(), name: "Roberto", score: Math.random() * 5 },
      { age: getAge(), name: "Lance", score: Math.random() * 5 },
      { age: getAge(), name: "Petra", score: Math.random() * 5 },
    ],
  },
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

export const NoResults: Story = {
  args: {
    value: {
      query: {
        data: undefined,
      },
    },
  },
};

export const Loading: Story = {
  args: {
    value: {
      query: {
        loading: true,
      },
    },
  },
};

export const ErrorState: Story = {
  // `Error` was taken. How rude.
  name: "Error",
  args: {
    value: {
      query: {
        error: new Error("Something went wrong"),
      },
    },
  },
};
