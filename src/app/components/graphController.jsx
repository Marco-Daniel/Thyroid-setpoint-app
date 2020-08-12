import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import { useGlobalState } from "../hooks/useGlobalState"

const validated = state => {
  const parsed = {
    minFT4: parseFloat(state.minFT4),
    maxFT4: parseFloat(state.maxFT4),
    minTSH: parseFloat(state.minTSH),
    maxTSH: parseFloat(state.maxTSH),
  }

  if (isNaN(parsed.minTSH)) return false
  if (isNaN(parsed.maxTSH)) return false
  if (isNaN(parsed.minFT4)) return false
  if (isNaN(parsed.maxFT4)) return false

  if (parsed.minTSH < 0) return false
  if (parsed.maxTSH < 0) return false
  if (parsed.minFT4 < 0) return false
  if (parsed.maxFT4 < 0) return false

  return true
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 325,
    height: "auto",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    paddingTop: 0,
  },
  textGroup: {
    display: "flex",
    justifyContent: "center",
  },
  inputs: {
    margin: theme.spacing(1),
  },
  header: {
    display: "inline-block",
    width: "100%",
    textAlign: "center",
  },
  reset: {
    color: theme.palette.text.primary,
  },
}))

const GraphController = ({ graphSettings }) => {
  const classes = useStyles()
  const [minFT4, setMinFT4] = useState(graphSettings.minFT4)
  const [maxFT4, setMaxFT4] = useState(graphSettings.maxFT4)
  const [minTSH, setMinTSH] = useState(graphSettings.minTSH)
  const [maxTSH, setMaxTSH] = useState(graphSettings.maxTSH)
  const { dispatch } = useGlobalState()

  const handleSubmit = e => {
    e.preventDefault()

    const payload = {
      minFT4: parseFloat(minFT4),
      maxFT4: parseFloat(maxFT4),
      minTSH: parseFloat(minTSH),
      maxTSH: parseFloat(maxTSH),
    }

    dispatch({ type: "UPDATE_AXIS", payload })
  }

  const handleReset = () => {
    setMinFT4(graphSettings.default.minFT4)
    setMaxFT4(graphSettings.default.maxFT4)
    setMinTSH(graphSettings.default.minTSH)
    setMaxTSH(graphSettings.default.maxTSH)
    dispatch({ type: "RESET_AXIS" })
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="overline" className={classes.header}>
        Wijzig grafiek instellingen
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <div className={classes.textGroup}>
            <TextField
              color="secondary"
              margin="dense"
              id="minTsh"
              label="min TSH"
              type="text"
              variant="outlined"
              value={minTSH}
              onChange={e => setMinTSH(e.target.value)}
              className={classes.inputs}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="maxTsh"
              label="max TSH"
              type="text"
              variant="outlined"
              value={maxTSH}
              onChange={e => setMaxTSH(e.target.value)}
              className={classes.inputs}
            />
          </div>
          <Divider />
          <div className={classes.textGroup}>
            <TextField
              color="secondary"
              margin="dense"
              id="minFt4"
              label="min FT4"
              type="text"
              variant="outlined"
              value={minFT4}
              onChange={e => setMinFT4(e.target.value)}
              className={classes.inputs}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="maxFt4"
              label="max FT4"
              type="text"
              variant="outlined"
              value={maxFT4}
              onChange={e => setMaxFT4(e.target.value)}
              className={classes.inputs}
            />
          </div>
        </div>

        <ButtonGroup disableElevation size="small" orientation="vertical" className={classes.inputs}>
          <Button type="submit" disabled={!validated({ minFT4, maxFT4, minTSH, maxTSH })} color="secondary" variant="contained">
            Wijzig
          </Button>
          <Button color="secondary" variant="outlined" onClick={handleReset} className={classes.reset}>
            Reset
          </Button>
        </ButtonGroup>
      </form>
    </Paper>
  )
}

export default GraphController
