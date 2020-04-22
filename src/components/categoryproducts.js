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

  // Change page
  const paginate = pageNumber => dispatch(changePage(pageNumber))

  const fetchFilterSortCategorieProducts = () => {
    let removeBoolean = checkedPriceFilters.length > filterRemove.length
    console.info("remove", removeBoolean)
    if (removeBoolean) {
      setLastRemovedFilter(
        filterRemove.filter(item => !checkedPriceFilters.includes(item))
      )
    }
    let tempArray = checkedPriceFilters
    setfilterRemove(checkedPriceFilters)

    if (checkedPriceFilters.length === 1) {
      // checked or not filter products

      let tempNum = checkedPriceFilters.length - 1
      let arrayValue1 = tempArray[tempNum].value

      console.info("ozan", tempArray[0])
      if (tempArray[0].value / minPriceInterval != 5) {
        client
          .query({
            query: SORT_FILTER_QUERY,
            variables: {
              catSlugG: catSlug,
              valueG: "ASC",
              greaterThan:
                arrayValue1 / minPriceInterval === 1
                  ? parseFloat(0)
                  : parseFloat(arrayValue1 / minPriceInterval - 1) *
                    minPriceInterval,
              lessThan: parseFloat(arrayValue1),
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
              greaterThan: parseFloat(arrayValue1),
              lessThan: parseFloat(10000000000),
              sortType: "price",
            },
          })
          .then(res => {
            let categoryProducts = res.data.allContentfulProduct.edges
            dispatch(sortCategorieProducts(categoryProducts))
          })
      }
    } else if (checkedPriceFilters.length > 1 && removeBoolean) {
      let tempNumber = checkedPriceFilters.length - 1
      let arrayValue = tempArray[tempNumber].value

      console.info("ozan", arrayValue, tempNumber)
      if (sortProductState === "ASC" || sortProductState === "DESC") {
        if (arrayValue / minPriceInterval != 5) {
          client
            .query({
              query: SORT_FILTER_QUERY,
              variables: {
                catSlugG: catSlug,
                valueG: sortProductState,
                greaterThan:
                  arrayValue / minPriceInterval === 1
                    ? parseFloat(0)
                    : parseFloat(
                        (arrayValue / minPriceInterval - 1) * minPriceInterval
                      ),
                lessThan: parseFloat(arrayValue),
                sortType: "price",
              },
            })
            .then(res => {
              console.info(res, "ozan")
              console.info("data", res.data.allContentfulProduct.edges)
              const categoryProducts = res.data.allContentfulProduct.edges

              dispatch(filterByPriceAdd({ categoryProducts, arrayValue }))
            })
        } else {
          client
            .query({
              query: SORT_FILTER_QUERY,
              variables: {
                catSlugG: catSlug,
                valueG: sortProductState,
                greaterThan: parseFloat(arrayValue),
                lessThan: parseFloat(10000000000),
                sortType: "price",
              },
            })
            .then(res => {
              const categoryProducts = res.data.allContentfulProduct.edges

              dispatch(filterByPriceAdd({ categoryProducts, arrayValue }))
            })
        }
      } else if (sortProductState === "r" && removeBoolean) {
        if (arrayValue / minPriceInterval != 5) {
          client
            .query({
              query: SORT_FILTER_QUERY,
              variables: {
                catSlugG: catSlug,
                valueG: "ASC",
                greaterThan:
                  arrayValue / minPriceInterval === 1
                    ? parseFloat(0)
                    : parseFloat(
                        (arrayValue / minPriceInterval - 1) * minPriceInterval
                      ),
                lessThan: parseFloat(arrayValue),
                sortType: "price",
              },
            })
            .then(res => {
              console.info(res, "ozan")
              console.info("data", res.data.allContentfulProduct.edges)
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
                greaterThan: parseFloat(arrayValue),
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
        if (arrayValue / minPriceInterval != 5) {
          client
            .query({
              query: SORT_FILTER_QUERY,
              variables: {
                catSlugG: catSlug,
                valueG: "ASC",
                greaterThan:
                  arrayValue / minPriceInterval === 1
                    ? parseFloat(0)
                    : parseFloat(
                        (arrayValue / minPriceInterval - 1) * minPriceInterval
                      ),
                lessThan: parseFloat(arrayValue),
                sortType: "discountedPrice",
              },
            })
            .then(res => {
              console.info(res, "ozan")
              console.info("data", res.data.allContentfulProduct.edges)
              const categoryProducts = res.data.allContentfulProduct.edges

              dispatch(filterByPrice(categoryProducts, arrayValue))
            })
        } else {
          client
            .query({
              query: SORT_FILTER_QUERY,
              variables: {
                catSlugG: catSlug,
                valueG: "ASC",
                greaterThan: parseFloat(arrayValue),
                lessThan: parseFloat(10000000000),
                sortType: "discountedPrice",
              },
            })
            .then(res => {
              const categoryProducts = res.data.allContentfulProduct.edges
              dispatch(filterByPrice(categoryProducts))
            })
        }
      }
    } else {
      // regular catgory products calling
      console.info(sortProductState, "sortproduct")

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
  const removeProductsByFilter = () => {
    console.info("filter remove", filterRemove)
  }
  useEffect(() => {
    fetchFilterSortCategorieProducts()
    removeProductsByFilter()
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
