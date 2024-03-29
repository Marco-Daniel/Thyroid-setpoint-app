import React from "react"
import PropTypes from "prop-types"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

const toolbarHeight = 50
const primaryColor = "#614385"
const secondaryColor = "#516395"

const ThemeWrapper = ({ children }) => {
  const defaultTheme = createMuiTheme()
  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Comfortaa", "Roboto", "sans-serif", "Ariel", "Verdana"].join(","),
    },
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: "#EFECF3",
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
