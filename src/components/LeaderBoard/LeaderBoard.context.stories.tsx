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
        data: undefined,
        error: undefined,
        loading: false,
      },
    },
  },
} satisfies Meta<typeof LeaderBoardContext.Provider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const NoResults: Story = {};

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
