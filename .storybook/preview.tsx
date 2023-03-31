import type { Preview, StoryFn } from "@storybook/react";
import AppProviders from "../src/AppProviders";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story: StoryFn) => (
    // Wrap all our stories in the same global <AppProviders /> to ensure we support global packages!
    <AppProviders>
      <Story />
    </AppProviders>
  ),
];
