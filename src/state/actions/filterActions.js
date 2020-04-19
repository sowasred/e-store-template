import {
  PRICE_FILTER_CHECK,
  CHECKED_PRICE_FILTERS,
  UNCHECKED_PRICE_FILTERS,
} from "../type"

export const handlePriceFilter = payload => ({
  type: PRICE_FILTER_CHECK,
  payload: payload,
})

export const checkedPriceFilters = payload => ({
  type: CHECKED_PRICE_FILTERS,
  payload: payload,
})

export const uncheckedPriceFilters = payload => ({
  type: UNCHECKED_PRICE_FILTERS,
  payload: payload,
})
