import {
  CHECKED_PRICE_FILTERS,
  UNCHECKED_PRICE_FILTERS,
  LAST_REMOVED_PRICE_FILTER,
  CHECKED_FIT_FILTERS,
  UNCHECKED_FIT_FILTERS,
} from "../type.js"

const initialState = {
  checkedPriceFilters: [],
  checkedFitFilters: [],
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
    case CHECKED_FIT_FILTERS:
      return {
        ...state,
        checkedFitFilters: state.checkedFitFilters.some(
          item => item.value === payload.value
        )
          ? state.checkedFitFilters.filter(
              (item, index) => item.value !== payload.value
            )
          : [...state.checkedFitFilters, payload],
      }
    case UNCHECKED_FIT_FILTERS:
      return {
        ...state,
        checkedFitFilters: [],
      }
    default:
      return state
  }
}

export default filterReducer
