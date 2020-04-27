import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import {
  checkedFitFilters,
  uncheckedFitFilters,
  styledFitFilters,
  seasonTypeFilters,
} from "../state/actions/filterActions"
import filterStyle from "./styles/filter.module.scss"

export const OtherFilters = () => {
  const checkedFitFiltersState = useSelector(
    state => state.filterReducer.checkedFitFilters,
    shallowEqual
  )
  const checkedStyledFiltersState = useSelector(
    state => state.filterReducer.checkedStyledFilters,
    shallowEqual
  )

  const checkedSeasonFiltersState = useSelector(
    state => state.filterReducer.checkedSeasonFilters,
    shallowEqual
  )

  const handleFitFilterClicked = e => {
    let tempValue = e.target.value
    console.info("ozan", tempValue)
    dispatch(checkedFitFilters({ value: tempValue }))
  }

  const handleStyleFilterClicked = e => {
    let tempValue = e.target.value
    console.info("ozan", tempValue)
    dispatch(styledFitFilters({ value: tempValue }))
  }
  const handleSeasonFilterClicked = e => {
    let tempValue = e.target.value
    console.info("ozan", tempValue)
    dispatch(seasonTypeFilters({ value: tempValue }))
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
          <label className={filterStyle.labelself} for="Fit Filter">
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
          <label className={filterStyle.labelself} for="Fit Filter">
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
          <label className={filterStyle.labelself} for="Fit Filter">
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
          <label className={filterStyle.labelself} for="Fit Filter">
            Regular
          </label>
        </div>
      </div>
    )
  }

  const renderStyleFilters = () => {
    return (
      <div>
        <h2>Style</h2>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Jacket")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Style Filter"
            value="Jacket"
          />
          <label className={filterStyle.labelself} for="Style Filter">
            Jacket
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Biker")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Style Filter"
            value="Biker"
          />
          <label className={filterStyle.labelself} for="Style Filter">
            Biker
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Blazer")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Style Filter"
            value="Blazer"
          />
          <label className={filterStyle.labelself} for="Style Filter">
            Blazer
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Coat")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Style Filter"
            value="Coat"
          />
          <label className={filterStyle.labelself} for="Style Filter">
            Coat
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Mac")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Style Filter"
            value="Mac"
          />
          <label className={filterStyle.labelself} for="Style Filter">
            Mac
          </label>
        </div>
      </div>
    )
  }

  const renderSeasonTypeFilters = () => {
    return (
      <div>
        <h2>Season</h2>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedSeasonFiltersState.some(
                item => item.value === "New Season"
              )
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleSeasonFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Season Type Filter"
            value="New Season"
          />
          <label className={filterStyle.labelself} for="Season Type Filter">
            New Season
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedSeasonFiltersState.some(item => item.value === "Regular")
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleSeasonFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Season Type Filter"
            value="Regular"
          />
          <label className={filterStyle.labelself} for="Season Type Filter">
            Regular
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedSeasonFiltersState.some(
                item => item.value === "Best Seller"
              )
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleSeasonFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Season Type Filter"
            value="Best Seller"
          />
          <label className={filterStyle.labelself} for="Season Type Filter">
            Best Seller
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedSeasonFiltersState.some(
                item => item.value === "Discounted"
              )
                ? "active"
                : "not-active"
            }
          ></span>
          <input
            onChange={e => {
              handleSeasonFilterClicked(e)
            }}
            className={filterStyle.inputself}
            type="checkbox"
            name="Season Type Filter"
            value="Discounted"
          />
          <label className={filterStyle.labelself} for="Season Type Filter">
            Discounted
          </label>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex" }}>
      {renderFitFilters()}
      {renderStyleFilters()}
      {renderSeasonTypeFilters()}
    </div>
  )
}

export default OtherFilters
