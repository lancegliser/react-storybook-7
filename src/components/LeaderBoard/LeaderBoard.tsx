import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LeaderBoardContext from "./LeaderBoard.context";
import { LinearProgress, Typography } from "@mui/material";

const LeaderBoard: React.FunctionComponent = () => {
  const { query } = useContext(LeaderBoardContext);

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
          {query.loading && (
            <TableRow>
              <TableCell component="th" colSpan={3}>
                <LinearProgress variant={"indeterminate"} />
              </TableCell>
            </TableRow>
          )}
          {query.error && (
            <TableRow>
              <TableCell
                component="th"
                colSpan={3}
                sx={{ textAlign: "center" }}
              >
                <Typography color={"error"} gutterBottom>
                  {query.error.message}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {query.data?.rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default LeaderBoard;
