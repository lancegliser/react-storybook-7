import type { Meta, StoryObj } from "@storybook/react";
import App, { RouteAppParams } from "./App";
import "./index.css";
import React from "react";
import { getRouterDecorator } from "../.storybook/decorators";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { delayForCanvas } from "../tests/utils/delay";

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
  /*
   * See https://storybook.js.org/docs/7.0/react/writing-stories/play-function#working-with-the-canvas
   * to learn more about using the canvasElement to query the DOM
   */
  play: async ({ canvasElement }) => {
    // Seems like a bug. See: https://github.com/storybookjs/storybook/issues/18663
    await delayForCanvas(canvasElement);
    const canvas = await within(canvasElement);

    const button = canvas.getByText("count is 0", { selector: "button" });
    // canvas.getByRole("button"); // Would require 'role="button"' in our component
    // canvas.getByTestId("button"); // Would require 'data-testid=""' in our component

    await userEvent.click(button);
    await expect(
      canvas.getByText(`count is 1`, { selector: "button" })
    ).toBeInTheDocument();
  },
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
