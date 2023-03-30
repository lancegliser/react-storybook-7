import type { Meta, StoryObj } from '@storybook/react';

import App from './App';
import "./index.css"

const meta = {
    component: App,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
        layout: 'fullscreen',
    },
    render: () => (
        <div id={"root"}>
            <App />
        </div>
    )
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
