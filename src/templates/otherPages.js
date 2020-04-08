import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const otherPages = ({ data }) => {
  return (
    <React.Fragment>
      <Layout>
        <h1>Derry Store</h1>
      </Layout>
    </React.Fragment>
  )
}

export default otherPages
