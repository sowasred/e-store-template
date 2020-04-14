import React from "react"
import { Link, graphql } from "gatsby"

import CatBreadCrumb from "../components/catbreadcrumbs"
import MobileFilter from "../components/mobilefilter"
import MobileSort from "../components/mobilesort"
import CategoryProducts from "../components/categoryproducts"

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
        price
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
      <CatBreadCrumb
        title={props.data.contentfulCategory.title.title}
        slug={props.data.contentfulCategory.slug}
      />
      <h1 className="categoryPageTitle">
        {props.data.contentfulCategory.title.title}
      </h1>
      {/* <p dangerouslySetInnerHTML={createMarkup()} /> */}
      <div className="filterandsort">
        <MobileFilter />
        <MobileSort />
      </div>
      <CategoryProducts
        catSlug={props.data.contentfulCategory.slug}
        products={props.data.contentfulCategory.products}
      />
    </Layout>
  )
}

export default categoryPages
