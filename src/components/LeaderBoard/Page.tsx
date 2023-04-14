import { LeaderBoardContextProvider } from "./LeaderBoard.context";
import { RouteObject } from "react-router/dist/lib/context";
import React from "react";
import LeaderBoard from "./LeaderBoard";
import { Typography } from "@mui/material";

export const RouteLeaderBoard: RouteObject = {
  path: `leader-board`,
  element: (
    <LeaderBoardContextProvider>
      <Typography variant={"h3"} gutterBottom>
        Leader Board
      </Typography>
      <LeaderBoard />
    </LeaderBoardContextProvider>
  ),
};
