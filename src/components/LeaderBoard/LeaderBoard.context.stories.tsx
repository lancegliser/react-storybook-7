import type { Meta, StoryObj } from "@storybook/react";
import LeaderBoard from "./LeaderBoard";
import React from "react";
import LeaderBoardContext, { getAge } from "./LeaderBoard.context";

const meta = {
  component: LeaderBoardContext.Provider,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "centered",
  },
  render: (args) => (
    <LeaderBoardContext.Provider {...args}>
      <LeaderBoard />
    </LeaderBoardContext.Provider>
  ),
  args: {
    value: {
      query: {
        data: undefined,
        error: undefined,
        loading: false,
      },
    },
  },
} satisfies Meta<typeof LeaderBoardContext.Provider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Data: Story = {
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
