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

  const animateHeader = () => {
    let siteTitle = document.querySelector("#sitetitle")

    if (
      document.body.scrollTop > 50 ||
      (document.documentElement.scrollTop > 50 && siteTitle)
    ) {
      siteTitle.style.fontSize = "20px"
      siteTitle.style.lineHeight = "20px"
      siteTitle.style.fontWeight = "300"
    } else {
      if (siteTitle) {
        siteTitle.style.fontSize = "30px"
        siteTitle.style.lineHeight = "30px"
      }
    }
  }

  window.onscroll = () => {
    // animateHeader()
  }

  return (
    <header onScroll={animateHeader()}>
      <Navigation className={headerStyle.navigation} />
      <span className={headerStyle.siteTitle}>
        <h1>
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
      </span>
      {isMobileState ? (
        <React.Fragment>
          <div className={headerStyle.mobileWrapper}>
            <a>
              <img src={search}></img>
            </a>
            <a>
              <img src={bag}></img>
            </a>
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
