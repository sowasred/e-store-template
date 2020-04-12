import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerStyle from "./styles/header.module.scss"
import Navigation from "./navigation"
import Dashboard from "./dashboard"

const Header = ({ siteTitle }) => {
  return (
    <header>
      <Navigation className={headerStyle.navigation} />
      <h1 className={headerStyle.siteTitle}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Dashboard />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
