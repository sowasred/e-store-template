import { CHECKED_PRICE_FILTERS } from "../type.js"

const initialState = {
  checkedPriceFilters: [],
}

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHECKED_PRICE_FILTERS:
      return {
        ...state,
        checkedPriceFilters: state.checkedPriceFilters.includes(payload)
          ? state.checkedPriceFilters.filter((item, index) => item !== payload)
          : [...state.checkedPriceFilters, payload],
      }
    default:
      return state
  }
}

export default filterReducer
