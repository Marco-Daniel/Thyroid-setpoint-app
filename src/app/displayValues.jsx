import React from "react"
import DisplayCard from "./displayCard"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  noValues: {
    paddingTop: theme.spacing(2),
  },
}))

const DisplayValues = ({ values, dispatch }) => {
  const classes = useStyles()
  if (values.length === 0)
    return (
      <Typography align="center" component="h2" variant="h6" className={classes.noValues}>
        Voer uw labwaardes in.
      </Typography>
    )

  return (
    <Grid container direction="column" justify="center" align="center" className={classes.root} spacing={1}>
      {values.map(value => (
        <Grid item xs={12} key={value.ft4 + value.tsh}>
          <DisplayCard key={value.ft4 - value.tsh} ft4={value.ft4} tsh={value.tsh} onClick={() => dispatch({ type: "REMOVE", payload: value })} />
        </Grid>
      ))}
    </Grid>
  )
}

export default DisplayValues
