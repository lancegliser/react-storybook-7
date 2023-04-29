import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LeaderBoardContext from "./LeaderBoard.context";
import { Skeleton, Typography } from "@mui/material";

const LeaderBoard: React.FunctionComponent = () => {
  const { query } = useContext(LeaderBoardContext);

  const sortedRows = query.data?.rows.slice() || [];
  sortedRows.sort(sortByScoreDesc);

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
              {sortedRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">
                    {row.score ? Math.round(row.score) : ""}
                  </TableCell>
                </TableRow>
              ))}
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
const sortByScoreDesc = (a: WithScore, b: WithScore): number =>
  (b.score || 0) - (a.score || 0);
