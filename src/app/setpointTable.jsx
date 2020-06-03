import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  table: {
    margin: `${theme.spacing(2)}px auto`,
    maxWidth: 235,
  },
  header: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
  lastRow: {
    borderBottom: "none",
  },
}))

const SetpointTable = ({ setpoint }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Typography className={classes.header}>Berekend setpoint</Typography>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>FT4:</TableCell>
            <TableCell align="right">{Number(setpoint.ft4).toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>TSH:</TableCell>
            <TableCell align="right">{Number(setpoint.tsh).toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className={classes.lastRow}>
            <TableCell>Passingsgraad:</TableCell>
            <TableCell align="right">{`${Number(setpoint.r2 * 100).toFixed(2)}%`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SetpointTable
