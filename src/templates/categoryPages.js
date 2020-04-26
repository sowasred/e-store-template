import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import CatBreadCrumb from "../components/catbreadcrumbs"
import MobileFilter from "../components/mobilefilter"
import CategoryProducts from "../components/categoryproducts"

import Layout from "../components/layout"
import MobileSort from "../components/mobilesort"

import { fetchCategories } from "../state/actions/categoryActions"
import { client } from "../context/ApolloClient"

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
  }
`

const CategoryPages = props => {
  const checkedPriceFilters = useSelector(
    state => state.filterReducer.checkedPriceFilters,
    shallowEqual
  )

  const dispatch = useDispatch()

  const fetchCategoriesLocal = () => {
    let navCategory = props.data.contentfulCategory.title.title
    let loading = false
    let currentPage = 1

    dispatch(
      fetchCategories({
        navCategory,
        loading,
        currentPage,
      })
    )
  }

  useEffect(() => {
    if (checkedPriceFilters === null || checkedPriceFilters.length === 0) {
      fetchCategoriesLocal()
    }
  }, [checkedPriceFilters])

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
        <MobileFilter catSlug={props.data.contentfulCategory.slug} />
        <MobileSort catSlug={props.data.contentfulCategory.slug} />
      </div>
      <CategoryProducts catSlug={props.data.contentfulCategory.slug} />
    </Layout>
  )
}

export default CategoryPages
