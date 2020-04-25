import {
  PRICE_FILTER_CHECK,
  CHECKED_PRICE_FILTERS,
  UNCHECKED_PRICE_FILTERS,
  LAST_REMOVED_PRICE_FILTER,
} from "../type"
import { batchActions } from "redux-batched-actions"

import store from "../createStore"

export const setLastRemovedFilter = payload => ({
  type: LAST_REMOVED_PRICE_FILTER,
  payload: payload,
})
export const handlePriceFilter = payload => {}

export const checkedPriceFilters = payload => ({
  type: CHECKED_PRICE_FILTERS,
  payload: payload,
})

export const uncheckedPriceFilters = payload => ({
  type: UNCHECKED_PRICE_FILTERS,
  payload: payload,
})
