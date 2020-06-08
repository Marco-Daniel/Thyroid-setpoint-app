import React, { useState } from "react"
import Button from "@material-ui/core/Button"
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

const AddValueButton = ({ dispatch }) => {
  const [open, setOpen] = useState(false)
  const [ft4, setFt4] = useState("")
  const [tsh, setTsh] = useState("")
  const [errors, setErrors] = useState({ ft4: [], tsh: [] })

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

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        color="secondary"
        disableElevation
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        Voeg waarde toe
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-add-values">
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Voeg uw FT4 en TSH labwaarde toe.</DialogContentText>
            <DisplayErrors errors={errors} />
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              id="ft4"
              label="FT4 labwaarde"
              type="text"
              fullWidth
              variant="outlined"
              value={ft4}
              onChange={e => setFt4(e.target.value)}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="tsh"
              label="TSH labwaarde"
              type="text"
              fullWidth
              variant="outlined"
              value={tsh}
              onChange={e => setTsh(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" tabIndex="1">
              Annuleer
            </Button>
            <Button type="submit" color="primary">
              Voeg toe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddValueButton