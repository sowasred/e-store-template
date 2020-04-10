/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import "../styles/index.scss"
import layoutStyle from "./styles/layout.module.scss"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className={layoutStyle.container}>
        <div className={layoutStyle.content}>
          <Header siteTitle={"Leather Store"} />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
