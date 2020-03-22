import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  let imageUrl = `https:${data.allContentfulMainPage.nodes[0].mainImage.fluid.src}`

  return (
    <Layout>
      <SEO title="Home" seo={data.allContentfulMainPage.nodes[0].seo} />
      <h1>{data.allContentfulMainPage.nodes[0].mainTitle}</h1>
      <img src={imageUrl} alt="Girl in a Leather Jacket" />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    allContentfulMainPage {
      nodes {
        seo {
          canonical
          metakeywords
          title
          description {
            content {
              content {
                value
              }
            }
          }
        }
        mainTitle
        description {
          description
        }
        longDescription {
          longDescription
        }
        mainImage {
          fluid {
            src
            tracedSVG
          }
        }
        otherImages {
          fluid {
            src
            tracedSVG
          }
        }
        product {
          price
          sku
          slug
          style
          quantity
          seasonType
          brand {
            companyName {
              companyName
            }
          }
          fit
          discountedPrice
        }
      }
    }
  }
`

export default IndexPage
