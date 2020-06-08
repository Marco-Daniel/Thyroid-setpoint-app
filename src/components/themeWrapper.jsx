import React from "react"
import PropTypes from "prop-types"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

const toolbarHeight = 50
const primaryColor = "#292A2C"
const secondaryColor = "#2DA3D3"

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
    },
    mixins: {
      toolbar: {
        minHeight: toolbarHeight,
        [[defaultTheme.breakpoints.down("sm")]]: {
          minHeight: toolbarHeight + 20,
        },
        [`${defaultTheme.breakpoints.up("xs")} and (orientation: landscape)`]: {
          minHeight: toolbarHeight - 8,
        },
        [[defaultTheme.breakpoints.up("sm")]]: {
          minHeight: toolbarHeight + 8,
        },
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          a: {
            color: secondaryColor,
            "&:hover, :focus, :visited": {
              color: primaryColor,
            },
          },
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

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeWrapper
