import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    contentfulCategory(slug: { eq: $slug }) {
      title {
        title
      }
      categoryDescription {
        childMarkdownRemark {
          html
        }
      }
      headerImage {
        fluid {
          src
        }
      }
      icon {
        fluid {
          src
        }
      }
      slug
      products {
        slug
        sku
        id
        discountedPrice
        image {
          fluid {
            src
          }
        }
        productName {
          productName
        }
        quantity
      }
    }
  }
`

const categoryPages = props => {
  function createMarkup() {
    return {
      __html:
        props.data.contentfulCategory.categoryDescription.childMarkdownRemark
          .html,
    }
  }

  return (
    <Layout>
      <h1>{props.data.contentfulCategory.title.title}</h1>
      <p dangerouslySetInnerHTML={createMarkup()} />
    </Layout>
  )
}

export default categoryPages
