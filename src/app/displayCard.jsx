import React from "react"
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

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    display: "flex",
  },
  content: {
    width: "100%",
    padding: 0,
  },
})

const DisplayCard = ({ ft4, tsh, onClick }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>FT4:</TableCell>
                <TableCell>{`${ft4}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TSH:</TableCell>
                <TableCell>{`${tsh}`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <IconButton onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default DisplayCard