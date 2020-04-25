import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import gql from "graphql-tag"

import Pagination from "./Pagination"
import catProductsStyle from "./styles/categoryproducts.module.scss"

import {
  changePage,
  sortCategorieProducts,
  filterByPriceAdd,
  filterByPrice,
  filterByPriceRemove,
} from "../state/actions/categoryActions"
import { client } from "../context/ApolloClient"

const SORT_FILTER_QUERY = gql`
  query sortFilterProducts(
    $catSlugG: String
    $valueG: [SortOrderEnum]
    $greaterThan: Float
    $lessThan: Float
    $sortType: [ContentfulProductFieldsEnum]
  ) {
    allContentfulProduct(
      filter: {
        price: { gt: $greaterThan, lte: $lessThan }
        categories: { elemMatch: { slug: { eq: $catSlugG } } }
      }
      sort: { fields: $sortType, order: $valueG }
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
const PRODUCT_QUERY = gql`
  query sortProducts($catSlugG: String) {
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

const CategoryProducts = ({ catSlug }) => {
  const [filterRemove, setfilterRemove] = useState([])
  const [lastRemovedFilter, setLastRemovedFilter] = useState()

  const dispatch = useDispatch()

  const categoryProductsState = useSelector(
    state => state.categoryReducer.categoryProducts,
    shallowEqual
  )
  const currentPageState = useSelector(
    state => state.categoryReducer.currentPage,
    shallowEqual
  )
  const productPerPageState = useSelector(
    state => state.categoryReducer.productPerPage,
    shallowEqual
  )
  const sortProductState = useSelector(
    state => state.categoryReducer.sortProductState,
    shallowEqual
  )

  const checkedPriceFilters = useSelector(
    state => state.filterReducer.checkedPriceFilters,
    shallowEqual
  )
  const minPriceInterval = useSelector(
    state => state.filterReducer.minPriceInterval,
    shallowEqual
  )
  // Get current posts
  const indexOfLastPost = currentPageState * productPerPageState
  const indexOfFirstPost = indexOfLastPost - productPerPageState

  const currentPosts = categoryProductsState.slice(
    indexOfFirstPost,
    indexOfLastPost
  )

  const lastRemovedPriceFilter = useSelector(
    state => state.filterReducer.lastRemovedPriceFilter,
    shallowEqual
  )

  // Change page
  const paginate = pageNumber => dispatch(changePage(pageNumber))

  const fetchFilterSortCategorieProducts = () => {
    let removeBoolean = checkedPriceFilters.length > filterRemove.length
    let lastRemoved = lastRemovedPriceFilter
    let tempArray = checkedPriceFilters

    if (tempArray.length > 0) {
      tempArray.map((item, index) => {
        if (index === 0) {
          if (item.value / minPriceInterval != 4) {
            client
              .query({
                query: SORT_FILTER_QUERY,
                variables: {
                  catSlugG: catSlug,
                  valueG: "ASC",
                  greaterThan:
                    item.value / minPriceInterval === 1
                      ? parseFloat(0)
                      : parseFloat(item.value / minPriceInterval - 1) *
                        minPriceInterval,
                  lessThan: parseFloat(item.value),
                  sortType: "price",
                },
              })
              .then(res => {
                let categoryProducts = res.data.allContentfulProduct.edges
                dispatch(sortCategorieProducts(categoryProducts))
              })
          } else {
            client
              .query({
                query: SORT_FILTER_QUERY,
                variables: {
                  catSlugG: catSlug,
                  valueG: "ASC",
                  greaterThan: parseFloat(item.value - minPriceInterval),
                  lessThan: parseFloat(10000000000),
                  sortType: "price",
                },
              })
              .then(res => {
                let categoryProducts = res.data.allContentfulProduct.edges
                dispatch(sortCategorieProducts(categoryProducts))
              })
          }
        } else if (index > 0) {
          if (sortProductState === "ASC" || sortProductState === "DESC") {
            let tempValue = item.value
            if (item.value / minPriceInterval != 4) {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: sortProductState,
                    greaterThan:
                      item.value / minPriceInterval === 1
                        ? parseFloat(0)
                        : parseFloat(
                            (item.value / minPriceInterval - 1) *
                              minPriceInterval
                          ),
                    lessThan: parseFloat(item.value),
                    sortType: "price",
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.edges
                  dispatch(filterByPriceAdd({ categoryProducts, tempValue }))
                })
            } else {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: sortProductState,
                    greaterThan: parseFloat(item.value - minPriceInterval),
                    lessThan: parseFloat(10000000000),
                    sortType: "price",
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.edges
                  dispatch(filterByPriceAdd({ categoryProducts, tempValue }))
                })
            }
          } else if (sortProductState === "r") {
            if (item.value / minPriceInterval != 4) {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: "ASC",
                    greaterThan:
                      item.value / minPriceInterval === 1
                        ? parseFloat(0)
                        : parseFloat(
                            (item.value / minPriceInterval - 1) *
                              minPriceInterval
                          ),
                    lessThan: parseFloat(item.value),
                    sortType: "price",
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.edges
                  dispatch(filterByPrice(categoryProducts))
                })
            } else {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: "ASC",
                    greaterThan: parseFloat(item.value - minPriceInterval),
                    lessThan: parseFloat(10000000000),
                    sortType: "price",
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.edges
                  dispatch(filterByPrice(categoryProducts))
                })
            }
          } else if (sortProductState === "highest-discount") {
            if (item.value / minPriceInterval != 4) {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: "ASC",
                    greaterThan:
                      item.value / minPriceInterval === 1
                        ? parseFloat(0)
                        : parseFloat(
                            (item.value / minPriceInterval - 1) *
                              minPriceInterval
                          ),
                    lessThan: parseFloat(item.value),
                    sortType: "price",
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.edges
                  dispatch(filterByPrice(categoryProducts))
                })
            } else {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: "ASC",
                    greaterThan: parseFloat(item.value - minPriceInterval),
                    lessThan: parseFloat(10000000000),
                    sortType: "price",
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.edges
                  dispatch(filterByPrice(categoryProducts))
                })
            }
          }
        }
      })
    } else {
      if (sortProductState === "ASC" || sortProductState === "DESC") {
        client
          .query({
            query: SORT_FILTER_QUERY,
            variables: {
              catSlugG: catSlug,
              valueG: sortProductState,
              greaterThan: parseFloat(0),
              lessThan: parseFloat(10000000),
              sortType: "price",
            },
          })
          .then(res => {
            console.info(res, "ozan")
            console.info("data", res.data.allContentfulProduct.edges)
            const categoryProducts = res.data.allContentfulProduct.edges
            dispatch(sortCategorieProducts(categoryProducts))
          })
      } else if (sortProductState === "r") {
        client
          .query({
            query: PRODUCT_QUERY,
            variables: {
              catSlugG: catSlug,
            },
          })
          .then(res => {
            console.info(res, "ozan")
            console.info("data", res.data.allContentfulProduct.edges)
            const categoryProducts = res.data.allContentfulProduct.edges
            dispatch(sortCategorieProducts(categoryProducts))
          })
      } else if (sortProductState === "highest-discount") {
        client
          .query({
            query: SORT_FILTER_QUERY,
            variables: {
              catSlugG: catSlug,
              valueG: "ASC",
              greaterThan: parseFloat(0),
              lessThan: parseFloat(10000000),
              sortType: "discountedPrice",
            },
          })
          .then(res => {
            console.info(res, "ozan")
            console.info("data", res.data.allContentfulProduct.edges)
            const categoryProducts = res.data.allContentfulProduct.edges
            dispatch(sortCategorieProducts(categoryProducts))
          })
      }
    }
  }

  useEffect(() => {
    fetchFilterSortCategorieProducts()
  }, [checkedPriceFilters, sortProductState])

  return (
    <React.Fragment>
      <section className={catProductsStyle.catWraper}>
        {categoryProductsState && categoryProductsState.length > 0 ? (
          categoryProductsState.map(item => {
            return (
              <article>
                <Link to={`${catSlug}/${item.node.slug}`}>
                  <img
                    src={item.node.image[0].fluid.src}
                    alt={item.node.productName.productName}
                  />
                  <h4>{item.node.productName.productName}</h4>
                </Link>
                <aside>
                  <span>CA${item.node.price.toFixed(2)}</span>
                  {/* <span>CA${item.discountedPrice}</span> */}
                </aside>
              </article>
            )
          })
        ) : (
          <h1>Unfortunetely, there is no products in this category.</h1>
        )}
      </section>
      {categoryProductsState && categoryProductsState.length > 0 ? (
        <Pagination
          productPerPage={productPerPageState}
          totalProducts={categoryProductsState.length}
          paginate={paginate}
          currentPage={currentPageState}
        />
      ) : null}
    </React.Fragment>
  )
}

export default CategoryProducts
