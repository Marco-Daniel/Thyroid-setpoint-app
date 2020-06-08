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
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    [[theme.breakpoints.down("xs")]]: {
      minWidth: "100vw",
      minHeight: "100vh",
    },
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const Disclaimer = ({ onClick }) => {
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
        Disclaimer
      </MenuItem>

      <Dialog open={open} onClose={handleClose} PaperProps={{ classes: { root: classes.dialogPaper } }}>
        <DialogTitle>Disclaimer</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Typography gutterBottom color="textPrimary">
              Door deze app te gebruiken stemt u in met deze disclaimer.{" "}
            </Typography>

            <Divider className={classes.divider} />

            <Typography variant="h6" gutterBottom>
              Uitsluiting van aansprakelijkheid{" "}
            </Typography>
            <Typography variant="body2" paragraph>
              Alle informatie in deze app is bedoeld voor persoonlijk gebruik. Aan de informatie kan men geen rechten ontlenen. Wijzigingen en
              typefouten zijn voorbehouden. Wij spannen ons in om de informatie op deze webpagina zo volledig en nauwkeurig mogelijk te laten zijn.
              Wij aanvaarden geen enkele verantwoordelijkheid voor schade, op welke manier dan ook ontstaan door gebruik, onvolledigheid of
              onjuistheid van de aangeboden informatie en calculator op deze website.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Beschikbaarheid{" "}
            </Typography>
            <Typography variant="body2" paragraph>
              De informatie en aanbevelingen op deze website kunnen zonder voorafgaande waarschuwing of kennisgeving worden gewijzigd. Wij spannen ons
              in om deze website zo veel mogelijk beschikbaar te stellen, maar wij aanvaarden geen enkele aansprakelijkheid voor eventuele gevolgen
              van (tijdelijke) niet-beschikbaarheid.{" "}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Auteursrechten en intellectuele eigendomsrechten{" "}
            </Typography>
            <Typography variant="body2">
              Het auteursrecht op deze website berust bij M.D. Design &amp; Development en/of bij aan haar gelieerde entiteiten of bij derden welke
              met toestemming dit (beeld)materiaal aan ons beschikbaar hebben gesteld. Vermenigvuldiging in wat voor vorm dan ook is alleen toegestaan
              na voorafgaande toestemming door M.D. Design &amp; Development. M.D. Design &amp; Development is niet verantwoordelijk voor content op
              de aan deze website gekoppelde bestanden en/of websites waarnaar wordt verwezen.
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

export default Disclaimer
