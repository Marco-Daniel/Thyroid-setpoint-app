import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TableBody from "@material-ui/core/TableBody"
import TableHead from "@material-ui/core/TableHead"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import DisplayGraph from "./displayGraph"

const errorInCalculations = setpoint => {
  // if it passed al validations this function returns false
  // if it didn't pass validation it will return true
  if (setpoint.tsh <= 0) return true
  if (setpoint.ft4 <= 0) return true
  if (setpoint.slope > 0) return true
  if (setpoint.multiplier < 0) return true
  if (setpoint.r2 < 0) return true

  if (isNaN(setpoint.slope)) return true
  if (isNaN(setpoint.multiplier)) return true
  if (isNaN(setpoint.tsh)) return true
  if (isNaN(setpoint.ft4)) return true
  if (isNaN(setpoint.r2)) return true

  return false
}

const useStyles = makeStyles(theme => ({
  noValues: {
    padding: theme.spacing(2),
  },
  table: {
    margin: `${theme.spacing(2)}px auto`,
    maxWidth: 235,
  },
  graph: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    maxWidth: 1050,
  },
  header: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}))

const DisplaySetpoint = ({ state, dispatch }) => {
  const classes = useStyles()
  const { setpoint } = state

  useEffect(() => {
    if (state.values.length === 0) dispatch({ type: "SWITCH_SCREEN", payload: "user-input" })
    if (state.values.length > 1) dispatch({ type: "CALC_SETPOINT" })
  }, [state.values])

  if (errorInCalculations(setpoint)) {
    return (
      <Typography align="center" component="h2" variant="h6" className={classes.noValues}>
        Helaas, op basis van deze gegevens is uw setpoint niet te berekenen.
      </Typography>
    )
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
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
              <TableRow>
                <TableCell>Passingsgraad:</TableCell>
                <TableCell align="right">{`${Number(setpoint.r2 * 100).toFixed(2)}%`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} component={Paper} className={classes.graph}>
        <DisplayGraph state={state} />
      </Grid>
    </Grid>
  )
}

export default DisplaySetpoint
