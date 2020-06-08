import React, { useState } from "react"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    [[theme.breakpoints.down("xs")]]: {
      minWidth: "100vw",
      minHeight: "100vh",
    },
  },
}))

const Help = ({ onClick }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleClose = () => setOpen(false)

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpen(true)
          onClick()
        }}
      >
        Help
      </MenuItem>

      <Dialog open={open} onClose={handleClose} PaperProps={{ classes: { root: classes.dialogPaper } }}>
        <DialogTitle>Hoe werkt deze app?</DialogTitle>
        <DialogContent>
          <DialogContentText component="div" color="textPrimary">
            <Typography variant="body2" paragraph>
              Begin met het invullen van minimaal 2 datapunten(tsh en ft4 combinatie). Dit kunt u doen door onderin het scherm op "VOEG WAARDE TOE" te
              klikken.
            </Typography>
            <Typography variant="body2" paragraph>
              Als er voldoende datapunten zijn ingevuld wordt de knop "BEREKEN SETPOINT" geactiveerd, deze staat naast de "VOEG WAARDE TOE"-knop. Door
              op deze knop te klikken wordt uw setpoint berekend en worden de resulten getoont. Als het op basis van uw gegevens niet mogelijk is om
              een setpoint berekening te doen dan zal de app u dat vertellen.
            </Typography>
            <Typography variant="body2" paragraph>
              Door op het vuilnisbakje naast een ingevuld datapunt te klikken verwijderd u deze weer uit de lijst. In het menu rechtboven is er een
              optie om alle datapunten in een keer te verwijderen.
            </Typography>
            <Typography variant="body2" paragraph>
              Het resultaat van de berekening is erg afhankelijk van de ingevulde datapunten.
            </Typography>
            <Typography variant="body2" paragraph>
              U kunt uw feedback mailen naar <a href="mailto:marco@mddd.nl">marco@mddd.nl</a>. Ik zie deze graag tegemoet.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Sluiten</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Help
