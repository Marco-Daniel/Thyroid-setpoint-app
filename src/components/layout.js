import React from "react"
import PropTypes from "prop-types"
import ThemeWrapper from "./themeWrapper"

const Layout = ({ children }) => <ThemeWrapper>{children}</ThemeWrapper>

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
