import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerStyle from "./styles/header.module.scss"
import Navigation from "./navigation"
import Dashboard from "./dashboard"
import bag from "../images/bag.svg"
import search from "../images/search.svg"
import { useSelector, shallowEqual } from "react-redux"
const Header = ({ siteTitle }) => {
  const isMobileState = useSelector(
    state => state.menuReducer.isMobile,
    shallowEqual
  )
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
      {isMobileState ? (
        <React.Fragment>
          <div className={headerStyle.wrapper}>
            <img src={search}></img>
            <img src={bag}></img>
          </div>
        </React.Fragment>
      ) : (
        <Dashboard />
      )}
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
