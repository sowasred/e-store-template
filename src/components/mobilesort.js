import React, { useState, useEffect } from "react"

import gql from "graphql-tag"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { client } from "../context/ApolloClient"

import sortStyle from "./styles/sort.module.scss"

import { sortCategorieProducts } from "../state/actions/categoryActions"

const SORT_QUERY = gql`
  query sortProducts($catSlugG: String, $valueG: [SortOrderEnum]) {
    allContentfulProduct(
      filter: { categories: { elemMatch: { slug: { eq: $catSlugG } } } }
      sort: { fields: price, order: $valueG }
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

const OTHER_QUERY = gql`
  query otherSortProducts($catSlugG: String) {
    allContentfulProduct(
      filter: { categories: { elemMatch: { slug: { eq: $catSlugG } } } }
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

const DISCOUNTED_QUERY = gql`
  query otherSortProducts($catSlugG: String) {
    allContentfulProduct(
      filter: { categories: { elemMatch: { slug: { eq: $catSlugG } } } }
      sort: { fields: discountedPrice, order: ASC }
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

const MobileSort = ({ catSlug }) => {
  const [value, setvalue] = useState("DESC")

  const dispatch = useDispatch()

  const handleChange = tempvalue => {
    console.info("prev", value)
    setvalue(tempvalue)
    console.info(value)
  }

  // let tempArray = []

  // const { loading, error, data } = useQuery(TEST_QUERY)

  const sortProducts = () => {
    if (value === "ASC" || value === "DESC") {
      client
        .query({
          query: SORT_QUERY,
          variables: { catSlugG: catSlug, valueG: value },
        })
        .then(res => {
          console.info("data", res.data.allContentfulProduct.edges)
          let categoryProducts = res.data.allContentfulProduct.edges
          dispatch(sortCategorieProducts({ categoryProducts, value }))
        })
        .then(console.log)
        .catch(console.error)
    } else if (value === "recommended") {
      client
        .query({
          query: OTHER_QUERY,
          variables: { catSlugG: catSlug },
        })
        .then(res => {
          let categoryProducts = res.data.allContentfulProduct.edges
          dispatch(sortCategorieProducts({ categoryProducts, value }))
        })
        .then(console.log)
        .catch(console.error)
    } else if (value === "highest-discount") {
      client
        .query({
          query: DISCOUNTED_QUERY,
          variables: { catSlugG: catSlug },
        })
        .then(res => {
          let categoryProducts = res.data.allContentfulProduct.edges
          dispatch(sortCategorieProducts({ categoryProducts, value }))
        })
        .then(console.log)
        .catch(console.error)
    }
  }

  useEffect(() => {
    sortProducts()
  }, [value])
  return (
    <select
      onChange={e => handleChange(e.target.value)}
      className={sortStyle.sortWrap}
    >
      <option selected value="recommended">
        Recommended
      </option>
      <option value="ASC">Price Low - High</option>
      <option value="DESC">Price High - Low</option>
      <option value="highest-discount">Highest Discount</option>
    </select>
  )
}

export default MobileSort
