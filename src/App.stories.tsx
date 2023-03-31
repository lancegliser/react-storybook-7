import type { Meta, StoryObj } from "@storybook/react";

import App, { RouteAppParams } from "./App";
import "./index.css";
import React from "react";
import { getRouterDecorator } from "../.storybook/decorators";

const meta = {
  component: App,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
  render: () => (
    // Force a div to reflect the `body` standards in the index
    <div style={{ height: "100%", display: "flex", placeItems: "center" }}>
      {/*Force a div to reflect the '#root` in the app*/}
      <div id={"root"}>
        <App />
      </div>
    </div>
  ),
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    getRouterDecorator({
      loader: () =>
        ({
          initialCount: undefined,
        } as RouteAppParams),
    }),
  ],
};

export const WithInitialCount33: Story = {
  decorators: [
    getRouterDecorator({
      loader: () =>
        ({
          initialCount: "33",
        } as RouteAppParams),
    }),
  ],
};
