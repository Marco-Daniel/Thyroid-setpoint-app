import React from "react"
import DisplayInput from "./displayInput"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { useGlobalState } from "../hooks/useGlobalState"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 auto",
    maxWidth: 1200,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  noValues: {
    paddingTop: theme.spacing(2),
  },
  gridItem: {
    margin: theme.spacing(0.5),
  },
}))

const InputScreen = () => {
  const classes = useStyles()
  const {
    state: { values },
    dispatch,
  } = useGlobalState()

  if (values.length === 0)
    return (
      <Typography align="center" component="h2" variant="h6" className={classes.noValues}>
        Voer uw labwaardes in.
      </Typography>
    )

  return (
    <Grid container justify="center" align="center" className={classes.root}>
      {values.map(value => (
        <Grid item xs={12} sm={4} md={3} lg={2} key={value.ft4 + value.tsh} className={classes.gridItem}>
          <DisplayInput key={value.ft4 - value.tsh} ft4={value.ft4} tsh={value.tsh} onClick={() => dispatch({ type: "REMOVE", payload: value })} />
        </Grid>
      ))}
    </Grid>
  )
}

export default InputScreen
