import {RouteObject} from "react-router/dist/lib/context";
import {Decorator, StoryFn} from "@storybook/react";
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import AppProviders from "../src/AppProviders";
import {routes} from "../src/App.routes";
import React from "react";

export const getRouterDecorator = (route: Pick<RouteObject, 'loader'>): Decorator =>
{

    return (Story: StoryFn) => {
        // A hack implementation to provide
        const router = createMemoryRouter([
            {
                path: "/",
                element: (
                    // Wrap all our stories in the same global <AppProviders /> to ensure we support global packages!
                    <AppProviders>
                        <Story />
                    </AppProviders>
                ),
                loader: route.loader,
                children: routes,
            },
        ]);

        return (
            <RouterProvider router={router} />
        )}
}
