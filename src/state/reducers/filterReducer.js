import {
  CHECKED_PRICE_FILTERS,
  UNCHECKED_PRICE_FILTERS,
  LAST_REMOVED_PRICE_FILTER,
} from "../type.js"

const initialState = {
  checkedPriceFilters: [],
  minPriceInterval: 50,
  lastRemovedPriceFilter: 0,
}

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHECKED_PRICE_FILTERS:
      return {
        ...state,
        checkedPriceFilters: state.checkedPriceFilters.some(
          item => item.value === payload.value
        )
          ? state.checkedPriceFilters.filter(
              (item, index) => item.value !== payload.value
            )
          : [...state.checkedPriceFilters, payload],
      }
    case UNCHECKED_PRICE_FILTERS:
      return {
        ...state,
        checkedPriceFilters: [],
      }
    case LAST_REMOVED_PRICE_FILTER:
      return {
        ...state,
        lastRemovedPriceFilter: payload,
      }

    default:
      return state
  }
}

export default filterReducer
