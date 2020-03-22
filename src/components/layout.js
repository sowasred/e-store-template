/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Navigation from "./navigation"
import "../styles/index.scss"
import layoutStyle from "./layout.module.scss"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className={layoutStyle.container}>
        <div className={layoutStyle.content}>
          <Header siteTitle={"Leather Jacket Store"} />
          <Navigation />
          <main>{children}</main>
        </div>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
