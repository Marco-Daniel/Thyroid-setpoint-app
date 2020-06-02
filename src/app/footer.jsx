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
}))

const Footer = ({ dispatch }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [ft4, setFt4] = useState("")
  const [tsh, setTsh] = useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const cleanState = () => {
    setFt4("")
    setTsh("")
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!isNaN(ft4) || !isNaN(tsh)) {
      dispatch({ type: "ADD", payload: { ft4, tsh } })
      cleanState()
      handleClose()
    } else {
      console.log(`ft4: ${ft4}, tsh: ${tsh}`)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <ButtonGroup disableElevation size="small" className={classes.buttons}>
            <Button variant="outlined">Bereken setpoint</Button>
            <Button variant="contained" onClick={handleClickOpen}>
              Voeg waarde toe
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-add-values">
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Voeg uw FT4 en TSH labwaarde toe.</DialogContentText>
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
