import React, { useState, useEffect } from "react"

import gql from "graphql-tag"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { client } from "../context/ApolloClient"

import sortStyle from "./styles/sort.module.scss"

import {
  filterByPrice,
  sortCategorieProducts,
  sortCategorieProductsByPrice,
  setSortState,
} from "../state/actions/categoryActions"

const MobileSort = ({ catSlug }) => {
  const dispatch = useDispatch()

  const handleChange = tempvalue => {
    dispatch(setSortState(tempvalue))
  }

  const checkedPriceFilters = useSelector(
    state => state.filterReducer.checkedPriceFilters,
    shallowEqual
  )
  // let tempArray = []

  // const { loading, error, data } = useQuery(TEST_QUERY)

  // const sortProducts = () => {
  //   if (checkedPriceFilters.length > 0) {
  //     let tempArray = checkedPriceFilters
  //     console.info("ozan", tempArray)
  //     let newArray = tempArray.sort(function(a, b) {
  //       return parseFloat(a.value) - parseFloat(b.value)
  //     })
  //     console.info("new Array", newArray)
  //     newArray.map((item, index) => {
  //       console.info("ozan2", item.value)
  //       let chekboxValue = item.value
  //       let tempIndex = chekboxValue / minInterval
  //       if (tempIndex < 4) {
  //         let grt = minInterval * (tempIndex - 1)
  //         let lte = tempIndex * minInterval
  //         console.info("grt", grt, lte)

  //         client
  //           .query({
  //             query: SORT_QUERYBYPRICE,
  //             variables: {
  //               catSlugG: catSlug,
  //               valueG: value,
  //               greaterThan: parseFloat(grt),
  //               lessThan: parseFloat(lte),
  //             },
  //           })
  //           .then(res => {
  //             console.info("data", res.data.allContentfulProduct.edges)
  //             let categoryProducts = res.data.allContentfulProduct.edges
  //             if (checkedPriceFilters.length === 1) {
  //               dispatch(filterByPrice(categoryProducts))
  //             } else {
  //               dispatch(
  //                 sortCategorieProductsByPrice({
  //                   categoryProducts,
  //                   chekboxValue,
  //                 })
  //               )
  //             }
  //           })
  //       } else if (tempIndex === 4) {
  //         let grt = minInterval * (tempIndex - 1)
  //         let lte = 10000000

  //         client
  //           .query({
  //             query: SORT_QUERYBYPRICE,
  //             variables: {
  //               catSlugG: catSlug,
  //               valueG: value,
  //               greaterThan: parseFloat(grt),
  //               lessThan: parseFloat(lte),
  //             },
  //           })
  //           .then(res => {
  //             console.info("data", res.data.allContentfulProduct.edges)
  //             let categoryProducts = res.data.allContentfulProduct.edges
  //             if (checkedPriceFilters.length === 1) {
  //               dispatch(filterByPrice({ categoryProducts, chekboxValue }))
  //             } else {
  //               dispatch(
  //                 sortCategorieProductsByPrice({
  //                   categoryProducts,
  //                   chekboxValue,
  //                 })
  //               )
  //             }
  //           })
  //       }
  //     })
  //   } else {
  //     if (value === "ASC" || value === "DESC") {
  //       client
  //         .query({
  //           query: SORT_QUERY,
  //           variables: { catSlugG: catSlug, valueG: value },
  //         })
  //         .then(res => {
  //           console.info("data", res.data.allContentfulProduct.edges)
  //           let categoryProducts = res.data.allContentfulProduct.edges
  //           dispatch(sortCategorieProducts({ categoryProducts, value }))
  //         })
  //         .then(console.log)
  //         .catch(console.error)
  //     } else if (value === "recommended") {
  //       client
  //         .query({
  //           query: OTHER_QUERY,
  //           variables: { catSlugG: catSlug },
  //         })
  //         .then(res => {
  //           let categoryProducts = res.data.allContentfulProduct.edges
  //           dispatch(sortCategorieProducts({ categoryProducts, value }))
  //         })
  //         .then(console.log)
  //         .catch(console.error)
  //     } else if (value === "highest-discount") {
  //       client
  //         .query({
  //           query: DISCOUNTED_QUERY,
  //           variables: { catSlugG: catSlug },
  //         })
  //         .then(res => {
  //           let categoryProducts = res.data.allContentfulProduct.edges
  //           dispatch(sortCategorieProducts({ categoryProducts, value }))
  //         })
  //         .then(console.log)
  //         .catch(console.error)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   sortProducts()
  // }, [value])
  return (
    <select
      onChange={e => handleChange(e.target.value)}
      className={sortStyle.sortWrap}
    >
      <option selected value="r">
        Recommended
      </option>
      <option value="ASC">Price Low - High</option>
      <option value="DESC">Price High - Low</option>
      <option value="highest-discount">Highest Discount</option>
    </select>
  )
}

export default MobileSort
