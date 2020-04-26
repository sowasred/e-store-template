import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import {
  checkedFitFilters,
  uncheckedFitFilters,
} from "../state/actions/filterActions"
import filterStyle from "./styles/filter.module.scss"

export const OtherFilters = () => {
  const checkedFitFiltersState = useSelector(
    state => state.filterReducer.checkedFitFilters,
    shallowEqual
  )
  const handleFitFilterClicked = e => {
    let tempValue = e.target.value
    console.info("ozan", tempValue)
    dispatch(checkedFitFilters({ value: tempValue }))
  }

  const dispatch = useDispatch()

  const renderFitFilters = () => {
    return (
      <div>
        <h2>Fit</h2>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedFitFiltersState.some(item => item.value === "Slim")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleFitFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Fit Filter"
            value="Slim"
          />
          <label className={filterStyle.labelself} for="Price Filter">
            Slim
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedFitFiltersState.some(item => item.value === "Oversized")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleFitFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Fit Filter"
            value="Oversized"
          />
          <label className={filterStyle.labelself} for="Price Filter">
            Oversized
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedFitFiltersState.some(item => item.value === "Cropped")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleFitFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Fit Filter"
            value="Cropped"
          />
          <label className={filterStyle.labelself} for="Price Filter">
            Cropped
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedFitFiltersState.some(item => item.value === "Regular")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleFitFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Fit Filter"
            value="Regular"
          />
          <label className={filterStyle.labelself} for="Price Filter">
            Regular
          </label>
        </div>
      </div>
    )
  }

  return <div style={{ display: "flex" }}>{renderFitFilters()}</div>
}

export default OtherFilters
