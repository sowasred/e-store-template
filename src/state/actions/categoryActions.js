import {
  CATEGORY_FETCHING,
  CHANGE_PAGE,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  FIRST_PAGE,
  LAST_PAGE,
  SORT_PRODUCTS,
  FILTER_PRODUCTS_BYPRICE,
  PRICE_FILTER_ADD_PRODUCT,
  PRICE_FILTER_REMOVE_PRODUCT,
} from "../type"

export const fetchCategories = payload => ({
  type: CATEGORY_FETCHING,
  payload: payload,
})
export const filterByPriceRemove = payload => ({
  type: PRICE_FILTER_REMOVE_PRODUCT,
  payload: payload,
})
export const filterByPriceAdd = payload => ({
  type: PRICE_FILTER_ADD_PRODUCT,
  payload: payload,
})

export const filterByPrice = payload => ({
  type: FILTER_PRODUCTS_BYPRICE,
  payload: payload,
})
export const sortCategorieProducts = payload => ({
  type: SORT_PRODUCTS,
  payload: payload,
})

export const changePage = payload => ({
  type: CHANGE_PAGE,
  payload: payload,
})

export const nextPageShow = payload => ({
  type: NEXT_PAGE,
  payload: payload,
})

export const previousPageShow = payload => ({
  type: PREVIOUS_PAGE,
  payload: payload,
})
export const firstPageShow = payload => ({
  type: FIRST_PAGE,
  payload: payload,
})
export const lastPageShow = payload => ({
  type: LAST_PAGE,
  payload: payload,
})
