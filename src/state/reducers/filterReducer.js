import { PRICE_FILTER_CHECK } from "../type.js"

const initialState = {
  priceFilter: 0,
}

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRICE_FILTER_CHECK:
      return {
        ...state,
        priceFilter: payload,
      }
    default:
      return state
  }
}

export default filterReducer
