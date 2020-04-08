import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MainpageIntro from "../components/mainpageintro"

const IndexPage = ({ data }) => {
  // let imageUrl = `https:${data.allContentfulMainPage.nodes[0].mainImage.fluid.src}`
  let womenImage = `https:${data.allContentfulMainPage.nodes[0].firstRow[0].fluid.src}`

  let menImage = `https:${data.allContentfulMainPage.nodes[0].firstRow[1].fluid.src}`

  let firstImage = `https:${data.allContentfulMainPage.nodes[0].secondRow[0].fluid.src}`
  let secondImage = `https:${data.allContentfulMainPage.nodes[0].secondRow[1].fluid.src}`

  return (
    <Layout>
      <SEO title="Home" seo={data.allContentfulMainPage.nodes[0].seo} />
      <MainpageIntro
        womenImage={womenImage}
        womeImageTitle={data.allContentfulMainPage.nodes[0].firstRow[0].title}
        menImage={menImage}
        menImageTitle={data.allContentfulMainPage.nodes[0].firstRow[1].title}
      />
      {/* <h1>{data.allContentfulMainPage.nodes[0].mainTitle}</h1> */}
      {/* <img src={imageUrl} alt="Girl in a Leather Jacket" /> */}
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
        firstRow {
          fluid {
            src
            tracedSVG
          }
          title
        }
        secondRow {
          fluid {
            src
            tracedSVG
          }
          title
        }
      }
    }
  }
`

export default IndexPage
