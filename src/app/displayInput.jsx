import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

const initialState = {
  mouseX: null,
  mouseY: null,
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 250,
    display: "flex",
  },
  content: {
    width: "100%",
    padding: 0,
  },
  button: {
    color: theme.palette.secondary.dark,
  },
}))

const DisplayInput = ({ ft4, tsh, onClick }) => {
  const classes = useStyles()
  const [contextMenu, setContextMenu] = useState(initialState)

  const openContextMenu = event => {
    event.preventDefault()
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    })
  }

  const closeContextMenu = () => {
    setContextMenu(initialState)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content} onContextMenu={openContextMenu} style={{ cursor: "context-menu" }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>FT4:</TableCell>
                  <TableCell align="right">{Number(ft4).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TSH:</TableCell>
                  <TableCell align="right">{Number(tsh).toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <IconButton onClick={onClick} className={classes.button}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Menu
        keepMounted
        open={contextMenu.mouseY !== null}
        onClose={closeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu.mouseY !== null && contextMenu.mouseX !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        <MenuItem onClick={onClick}>Verwijder</MenuItem>
      </Menu>
    </>
  )
}

export default DisplayInput
