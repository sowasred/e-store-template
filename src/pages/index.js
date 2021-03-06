import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MainpageIntro from "../components/mainpageintro"
import BelowSection from "../components/belowsection"
import MailSignup from "../components/mailsignup"
import FeaturedProduct from "../components/featuredproduct"
import Header from "../components/header"
import headerStyle from "../components/styles/header.module.scss"

export const pageQuery = graphql`
  query HomePageQuery {
    allContentfulMainPage {
      nodes {
        seo {
          canonical
          metakeywords
          title
          description
        }
        mainTitle
        description {
          content {
            content {
              value
            }
          }
        }
        longDescription {
          longDescription
        }
        product {
          price
          sku
          slug
          quantity
          image {
            fluid {
              src
            }
          }
          brand {
            companyName {
              companyName
            }
          }
          discountedPrice
          productName {
            productName
          }
          productDescription {
            productDescription
          }
        }
        firstRow {
          fluid {
            src
          }
          title
        }
        secondRow {
          fluid {
            src
          }
          title
        }
      }
    }
    allContentfulNavMenu {
      edges {
        node {
          categories {
            ... on ContentfulCategory {
              title {
                title
              }
              slug
              icon {
                fluid {
                  src
                }
              }
              categoryDescription {
                categoryDescription
              }
            }
          }
          otherPages {
            title
            slug
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  // let imageUrl = `https:${data.allContentfulMainPage.nodes[0].mainImage.fluid.src}`

  let womenImage = `https:${data.allContentfulMainPage.nodes[0].firstRow[0].fluid.src}`

  let menImage = `https:${data.allContentfulMainPage.nodes[0].firstRow[1].fluid.src}`
  // let bannerImage = `https:${data.allContentfulMainPage.nodes[0].firstRow[2].fluid.src}`

  let firstImage = `https:${data.allContentfulMainPage.nodes[0].secondRow[0].fluid.src}`
  let secondImage = `https:${data.allContentfulMainPage.nodes[0].secondRow[1].fluid.src}`
  let description =
    data.allContentfulMainPage.nodes[0].description.content[0].content[0].value

  let longDescription =
    data.allContentfulMainPage.nodes[0].longDescription.longDescription

  let featuredProducts = data.allContentfulMainPage.nodes[0].product
  let seoTemp = data.allContentfulMainPage.nodes[0].seo
  let navTemp = data

  return (
    <Layout>
      <SEO
        title="Home"
        title={seoTemp.title}
        description={seoTemp.description}
        metakeys={seoTemp.metakeywords}
        canonical={seoTemp.canonical}
      />
      <Header
        categories={navTemp.allContentfulNavMenu.edges[0].node.categories}
        otherPages={navTemp.allContentfulNavMenu.edges[0].node.otherPages}
        className={headerStyle.navigation}
        siteTitle={"DERRY"}
      />
      <MainpageIntro
        womenImage={womenImage}
        womeImageTitle={data.allContentfulMainPage.nodes[0].firstRow[0].title}
        menImage={menImage}
        menImageTitle={data.allContentfulMainPage.nodes[0].firstRow[1].title}
      />
      <FeaturedProduct featuredProducts={featuredProducts} />
      <BelowSection
        firstImage={firstImage}
        firstImageTitle={data.allContentfulMainPage.nodes[0].secondRow[0].title}
        secondImage={secondImage}
        secondImageTitle={
          data.allContentfulMainPage.nodes[0].secondRow[1].title
        }
        longDescription={longDescription}
      />


      <MailSignup description={description} />
      {/* <h1>{data.allContentfulMainPage.nodes[0].mainTitle}</h1> */}
      {/* <img src={imageUrl} alt="Girl in a Leather Jacket" /> */}
    </Layout>
  )
}

export default IndexPage
