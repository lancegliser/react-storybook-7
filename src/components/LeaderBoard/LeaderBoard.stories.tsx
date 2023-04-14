import type { Meta, StoryObj } from "@storybook/react";
import LeaderBoard from "./LeaderBoard";
import React from "react";
import LeaderBoardContext, {
  getAge,
  ILeaderBoardContext,
} from "./LeaderBoard.context";

const meta = {
  component: LeaderBoard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
  render: () => (
    // Force a div to reflect the `body` standards in the index
    <div style={{ height: "100%", display: "flex", placeItems: "center" }}>
      {/*Force a div to reflect the '#root` in the LeaderBoard*/}
      <div id={"root"}>
        <LeaderBoard />
      </div>
    </div>
  ),
} satisfies Meta<typeof LeaderBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Props {
  children: React.ReactNode;
  query: ILeaderBoardContext["query"];
}
const LeaderBoardContextProvider: React.FunctionComponent<Props> = ({
  children,
  query,
}) => {
  return (
    <LeaderBoardContext.Provider
      value={{
        query,
      }}
    >
      {children}
    </LeaderBoardContext.Provider>
  );
};

export const Default: Story = {
  render: () => (
    <LeaderBoardContextProvider query={{}}>
      <LeaderBoard />
    </LeaderBoardContextProvider>
  ),
};

export const Data: Story = {
  render: () => (
    <LeaderBoardContextProvider
      query={{
        data: {
          rows: [
            { age: getAge(), name: "Roberto", score: 2 },
            { age: getAge(), name: "Lance", score: Math.random() * 5 },
            { age: getAge(), name: "Petra", score: 10_000 },
          ],
        },
      }}
    >
      <LeaderBoard />
    </LeaderBoardContextProvider>
  ),
};

export const Loading: Story = {
  render: () => (
    <LeaderBoardContextProvider query={{ loading: true }}>
      <LeaderBoard />
    </LeaderBoardContextProvider>
  ),
};

export const ErrorState: Story = {
  // `Error` was taken. How rude.
  name: "Error",
  render: () => (
    <LeaderBoardContextProvider
      query={{ error: new Error("Something went wrong") }}
    >
      <LeaderBoard />
    </LeaderBoardContextProvider>
  ),
};
