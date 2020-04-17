import { PRICE_FILTER_CHECK } from "../type"

export const handlePriceFilter = payload => ({
  type: PRICE_FILTER_CHECK,
  payload: payload,
})
