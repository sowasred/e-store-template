import {
  CHECKED_PRICE_FILTERS,
  UNCHECKED_PRICE_FILTERS,
  LAST_REMOVED_PRICE_FILTER,
  CHECKED_FIT_FILTERS,
  UNCHECKED_FIT_FILTERS,
} from "../type"

export const checkedPriceFilters = payload => ({
  type: CHECKED_PRICE_FILTERS,
  payload: payload,
})

export const uncheckedPriceFilters = payload => ({
  type: UNCHECKED_PRICE_FILTERS,
  payload: payload,
})

export const setLastRemovedFilter = payload => ({
  type: LAST_REMOVED_PRICE_FILTER,
  payload: payload,
})

export const checkedFitFilters = payload => ({
  type: CHECKED_FIT_FILTERS,
  payload: payload,
})

export const uncheckedFitFilters = payload => ({
  type: UNCHECKED_FIT_FILTERS,
  payload: payload,
})
