import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import Pagination from "../components/Pagination"
import CatBreadCrumb from "../components/catbreadcrumbs"
import MobileFilter from "../components/mobilefilter"
import CategoryProducts from "../components/categoryproducts"

import Layout from "../components/layout"
import MobileSort from "../components/mobilesort"

import { fetchCategories, changePage } from "../state/actions/categoryActions"

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
    }
    allContentfulProduct(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          price
          slug
          discountedPrice
          image {
            fluid {
              src
            }
            title
          }
          productName {
            productName
          }
        }
      }
    }
  }
`

const CategoryPages = props => {
  const categoryProductsState = useSelector(
    state => state.categoryReducer.categoryProducts,
    shallowEqual
  )
  const productPerPageState = useSelector(
    state => state.categoryReducer.productPerPage,
    shallowEqual
  )

  const currentPageState = useSelector(
    state => state.categoryReducer.currentPage,
    shallowEqual
  )
  const dispatch = useDispatch()

  const fetchCategoriesLocal = () => {
    let categoryProducts = props.data.allContentfulProduct.edges
    let numberOfItems = props.data.allContentfulProduct.edges.length
    let navCategory = props.data.contentfulCategory.title.title
    let loading = false
    let currentPage = 1

    dispatch(
      fetchCategories({
        categoryProducts,
        numberOfItems,
        navCategory,
        loading,
        currentPage,
      })
    )
  }

  useEffect(() => {
    fetchCategoriesLocal()
  }, [])

  // Get current posts
  const indexOfLastPost = currentPageState * productPerPageState
  const indexOfFirstPost = indexOfLastPost - productPerPageState
  const currentPosts = categoryProductsState.slice(
    indexOfFirstPost,
    indexOfLastPost
  )

  // Change page
  const paginate = pageNumber => dispatch(changePage(pageNumber))

  const createMarkup = () => {
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
      <div style={{ display: "flex" }}>
        <MobileFilter
          catSlug={props.data.contentfulCategory.slug}
          products={currentPosts}
        />
        <MobileSort catSlug={props.data.contentfulCategory.slug} />
      </div>

      <CategoryProducts
        catSlug={props.data.contentfulCategory.slug}
        products={currentPosts}
      />
      <Pagination
        productPerPage={productPerPageState}
        totalProducts={categoryProductsState.length}
        paginate={paginate}
        currentPage={currentPageState}
      />
    </Layout>
  )
}

export default CategoryPages
