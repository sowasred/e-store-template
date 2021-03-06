import React, { useState, useEffect } from "react"

import gql from "graphql-tag"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { client } from "../../wrap-with-provider"

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
