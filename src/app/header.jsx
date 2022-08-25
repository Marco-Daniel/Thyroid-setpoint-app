import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MoreIcon from "@material-ui/icons/MoreVert"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Disclaimer from "./components/disclaimer"
import Divider from "@material-ui/core/Divider"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Slide from "@material-ui/core/Slide"
import HelpScreen from "./components/helpScreen"
import logo from "../images/logo.png"

import AddValueButton from "./components/addValueButton"
import { useGlobalState } from "./hooks/useGlobalState"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    margin: theme.spacing(1.5),
  },
  alignRight: {
    marginRight: 0,
    marginLeft: "auto",
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  version: {
    color: theme.palette.secondary.main,
    opacity: "1 !important",
    justifyContent: "center",
  },
}))

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({ threshold: 75 })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Header = ({ displayBack }) => {
  const {
    site: {
      siteMetadata: { version },
    },
  } = useStaticQuery(graphql`
    query header {
      site {
        siteMetadata {
          version
        }
      }
    }
  `)

  const { dispatch } = useGlobalState()

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const [openHelp, setOpenHelp] = useState(false)
  const handleHelpClose = () => setOpenHelp(false)
  const handleHelpOpen = () => setOpenHelp(true)

  const goToDisplayValues = () => dispatch({ type: "SWITCH_SCREEN", payload: "user-input" })

  const addExampleData = index => {
    dispatch({ type: "CREATE_EXAMPLE_DATA", payload: index })
    handleClose()
  }

  const clearInput = () => {
    dispatch({ type: "CLEAR_USER_INPUT" })
    handleClose()
  }

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <HideOnScroll>
        <AppBar position="sticky" className={classes.root}>
          <Toolbar>
            {displayBack && (
              <IconButton aria-label="display more actions" edge="start" color="inherit" onClick={goToDisplayValues}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <div className={classes.title}>
              <img alt="logo" src={logo} width={42} className={classes.img} />
              <Typography variant="h5" component="h1" align="center">
                Setpoint Calculator
              </Typography>
              <img alt="logo" src={logo} width={42} className={classes.img} />
            </div>
            <IconButton
              aria-label="display more-actions"
              aria-haspopup="true"
              color="inherit"
              onClick={handleHelpOpen}
              className={classes.alignRight}
            >
              <HelpOutlineIcon />
            </IconButton>
            <IconButton aria-label="display more-actions" aria-haspopup="true" onClick={handleClick} color="inherit">
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Menu id="more-actions" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={clearInput}>Start opnieuw</MenuItem>
        <AddValueButton menuItem={handleClose} />
        <Divider className={classes.divider} />
        <MenuItem onClick={() => addExampleData(0)}>Voorbeeld 1</MenuItem>
        <MenuItem onClick={() => addExampleData(1)}>Voorbeeld 2</MenuItem>
        <MenuItem onClick={() => addExampleData(2)}>Voorbeeld 3</MenuItem>
        <MenuItem onClick={() => addExampleData(3)}>Voorbeeld 4</MenuItem>
        <Divider className={classes.divider} />
        <MenuItem
          onClick={() => {
            handleClose()
            handleHelpOpen()
          }}
        >
          Help
        </MenuItem>
        <Disclaimer onClick={handleClose} />
        <MenuItem onClick={handleClose} component="a" href="mailto:marco@mddd.nl" rel="noreferrer noopener" target="_blank">
          Geef feedback
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="https://mddd.nl" rel="noreferrer noopener" target="_blank">
          Ontwikkelaar
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="https://tbiomed.biomedcentral.com/articles/10.1186/1742-4682-11-35"
          rel="noreferrer noopener"
          target="_blank"
        >
          Wetenschappelijke artikel
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem dense disabled className={classes.version}>{`Versie: ${version}`}</MenuItem>
      </Menu>

      <HelpScreen open={openHelp} handleClose={handleHelpClose} />
    </>
  )
}

export default Header
