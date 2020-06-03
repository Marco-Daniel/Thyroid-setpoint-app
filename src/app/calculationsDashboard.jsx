import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import DisplayGraph from "./displayGraph"
import GraphController from "./graphController"
import SetpointTable from "./setpointTable"

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
  graph: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    maxWidth: 1050,
  },
}))

const CalculationsDashboard = ({ state, dispatch }) => {
  const classes = useStyles()

  useEffect(() => {
    if (state.values.length === 0) dispatch({ type: "SWITCH_SCREEN", payload: "user-input" })
    if (state.values.length > 1) dispatch({ type: "CALC_SETPOINT" })
  }, [state.values])

  if (errorInCalculations(state.setpoint)) {
    return (
      <Typography align="center" component="h2" variant="h6" className={classes.noValues}>
        Helaas, op basis van deze gegevens is uw setpoint niet te berekenen.
      </Typography>
    )
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <SetpointTable setpoint={state.setpoint} />
      </Grid>
      <Grid item xs={12}>
        <GraphController dispatch={dispatch} graphSettings={state.graph} />
      </Grid>
      <Grid item xs={12} component={Paper} className={classes.graph}>
        <DisplayGraph state={state} />
      </Grid>
    </Grid>
  )
}

export default CalculationsDashboard