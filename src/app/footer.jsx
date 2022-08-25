import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Slide from "@material-ui/core/Slide"
import AddValueButton from "./components/addValueButton"
import { useGlobalState } from "./hooks/useGlobalState"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  toolBar: {
    backgroundColor: theme.palette.primary.light,
  },
  buttons: {
    margin: "0 auto",
  },
  secondaryButton: {
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.contrastText,
    borderRight: "none",
    "&:hover": {
      borderRight: "none",
      borderColor: theme.palette.primary.dark,
    },
  },
  offset: theme.mixins.toolbar,
}))

const Footer = ({ disableSetpointButton, hide }) => {
  const classes = useStyles()
  const { dispatch } = useGlobalState()

  const calculateSetpoint = () => dispatch({ type: "CALC_SETPOINT" })

  return (
    <div className={classes.root}>
      <Slide appear={false} direction="up" in={!hide}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <ButtonGroup disableElevation size="small" className={classes.buttons} color="secondary">
              <Button variant="outlined" disabled={disableSetpointButton} onClick={calculateSetpoint} className={classes.secondaryButton}>
                Bereken setpoint
              </Button>
              <AddValueButton />
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </Slide>
      <div className={classes.offset} />
    </div>
  )
}

export default Footer
