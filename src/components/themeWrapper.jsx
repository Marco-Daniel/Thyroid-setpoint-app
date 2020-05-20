import React from "react"
import PropTypes from "prop-types"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

const toolbarHeight = 50
const primaryColor = "#69469B"
const secondaryColor = "#cf8fd2"

const ThemeWrapper = ({ children }) => {
  const defaultTheme = createMuiTheme()
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      info: {
        main: secondaryColor,
      },
    },
    mixins: {
      toolbar: {
        minHeight: toolbarHeight,
        [`${defaultTheme.breakpoints.up("xs")} and (orientation: landscape)`]: {
          minHeight: toolbarHeight - 8,
        },
        [[defaultTheme.breakpoints.up("sm")]]: {
          minHeight: toolbarHeight + 8,
        },
      },
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeWrapper
