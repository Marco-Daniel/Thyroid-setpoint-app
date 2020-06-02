import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"

const DisplayErrors = ({ errors }) => {
  const style = { color: "red" }
  if (errors.ft4.length === 0 && errors.tsh.length === 0) {
    return null
  } else {
    return (
      <>
        {errors.ft4.length > 0 && errors.ft4.map((err, i) => <DialogContentText key={i} style={style}>{`ft4: ${err}`}</DialogContentText>)}
        {errors.tsh.length > 0 && errors.tsh.map((err, i) => <DialogContentText key={i} style={style}>{`tsh: ${err}`}</DialogContentText>)}
      </>
    )
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  buttons: {
    margin: "0 auto",
  },
  offset: theme.mixins.toolbar,
}))

const Footer = ({ dispatch, disableSetpointButton }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [ft4, setFt4] = useState("")
  const [tsh, setTsh] = useState("")
  const [errors, setErrors] = useState({ ft4: [], tsh: [] })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    cleanState()
    setOpen(false)
  }

  const cleanState = () => {
    setErrors({ ft4: [], tsh: [] })
    setFt4("")
    setTsh("")
  }

  const handleSubmit = e => {
    e.preventDefault()

    const ft4Errors = validate(ft4)
    const tshErrors = validate(tsh)

    if (ft4Errors.length === 0 && tshErrors.length === 0) {
      dispatch({ type: "ADD", payload: { ft4, tsh } })
      handleClose()
    } else {
      setErrors({ ft4: [...ft4Errors], tsh: [...tshErrors] })
    }
  }

  const validate = input => {
    const errors = []
    if (isNaN(input)) errors.push("invoer is geen nummer")
    if (input <= 0) errors.push("invoer moet hoger dan 0 zijn")

    return errors
  }

  const calculateSetpoint = () => dispatch({ type: "CALC_SETPOINT" })

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <ButtonGroup disableElevation size="small" className={classes.buttons}>
            <Button variant="outlined" disabled={disableSetpointButton} onClick={calculateSetpoint}>
              Bereken setpoint
            </Button>
            <Button variant="contained" onClick={handleClickOpen}>
              Voeg waarde toe
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-add-values">
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Voeg uw FT4 en TSH labwaarde toe.</DialogContentText>
            <DisplayErrors errors={errors} />
            <TextField autoFocus margin="dense" id="ft4" label="FT4 labwaarde" type="text" fullWidth variant="outlined" value={ft4} onChange={e => setFt4(e.target.value)} />
            <TextField margin="dense" id="tsh" label="TSH labwaarde" type="text" fullWidth variant="outlined" value={tsh} onChange={e => setTsh(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuleer
            </Button>
            <Button type="submit" color="primary">
              Voeg toe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Footer
