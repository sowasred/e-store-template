import {
  CATEGORY_FETCHING,
  CHANGE_PAGE,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  FIRST_PAGE,
  LAST_PAGE,
  SORT_PRODUCTS,
} from "../type"

export const fetchCategories = payload => ({
  type: CATEGORY_FETCHING,
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
