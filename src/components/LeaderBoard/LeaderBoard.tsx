import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LeaderBoardContext from "./LeaderBoard.context";
import { Grid, Skeleton, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const LeaderBoard: React.FunctionComponent = () => {
  const { query } = useContext(LeaderBoardContext);

  const sortedRows = query.data?.rows.slice() || [];
  sortedRows.sort(sortByScore);

  type Rank = Record<string, number>;
  const ranks = sortedRows.reduce((ranks, row, index) => {
    ranks[row.name] = index + 1;
    return ranks;
  }, {} as Rank);

  const previousScoreSortedRows = query.data?.rows.slice() || [];
  previousScoreSortedRows.sort(sortByPreviousScore);
  const previousRanks = previousScoreSortedRows.reduce((ranks, row, index) => {
    ranks[row.name] = index + 1;
    return ranks;
  }, {} as Rank);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {query.loading ? (
            new Array(3).fill(0).map(() => (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Skeleton width={"30ch"} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton width={"5ch"} sx={{ display: "inline-block" }} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton width={"10ch"} sx={{ display: "inline-block" }} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {query.error && (
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={3}
                    sx={{ textAlign: "center" }}
                  >
                    <Typography color={"error"}>
                      {query.error.message}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {!query.error && !query.data?.rows?.length && (
                <TableRow>
                  <TableCell
                    component="th"
                    colSpan={3}
                    sx={{ textAlign: "center" }}
                  >
                    <Typography color={"text.secondary"}>No results</Typography>
                  </TableCell>
                </TableRow>
              )}
              {sortedRows.map((row) => {
                const rank = ranks[row.name];
                const previousRank = previousRanks[row.name];
                const change =
                  !rank || !previousRank ? undefined : previousRank - rank;

                return (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"space-between"}
                      >
                        <Grid item>
                          {rank} - {row.name}
                        </Grid>
                        <Grid item>
                          {typeof change === "number" &&
                            (change > 0 ? (
                              <Typography
                                fontSize={"inherit"}
                                component={"span"}
                                color={"success.main"}
                              >
                                <ArrowUpwardIcon fontSize={"small"} />
                                {change}
                              </Typography>
                            ) : (
                              change < 0 && (
                                <Typography
                                  fontSize={"inherit"}
                                  component={"span"}
                                  color={"error.main"}
                                >
                                  <ArrowUpwardIcon
                                    fontSize={"small"}
                                    sx={{ transform: "rotate(180deg)" }}
                                  />
                                  {Math.abs(change)}
                                </Typography>
                              )
                            ))}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">
                      {row.score ? Math.round(row.score) : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default LeaderBoard;

interface WithScore {
  score?: number;
}
const sortByScore = (a: WithScore, b: WithScore): number =>
  (b.score || 0) - (a.score || 0);

interface WithPreviousScore {
  previousScore?: number;
}
const sortByPreviousScore = (
  a: WithPreviousScore,
  b: WithPreviousScore
): number => (b.previousScore || 0) - (a.previousScore || 0);
