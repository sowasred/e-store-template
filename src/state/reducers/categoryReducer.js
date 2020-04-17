import {
  CATEGORY_FETCHING,
  CHANGE_PAGE,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  FIRST_PAGE,
  LAST_PAGE,
  SORT_PRODUCTS,
} from "../type.js"

const initialState = {
  navCategory: "",
  categoryProducts: [],
  numberOfItems: 0,
  loading: true,
  currentPage: 1,
  productPerPage: 6,
  sortProductState: "",
}

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_FETCHING:
      return {
        ...state,
        navCategory: payload.navCategory,
        categoryProducts: payload.categoryProducts,
        numberOfItems: payload.numberOfItems,
        loading: payload.loading,
        currentPage: payload.currentPage,
      }
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: payload,
      }
    case NEXT_PAGE:
      return {
        ...state,
        currentPage:
          state.currentPage > state.numberOfItems / state.productPerPage
            ? 1
            : state.currentPage + 1,
      }
    case PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      }
    case FIRST_PAGE:
      return {
        ...state,
        currentPage: 1,
      }
    case LAST_PAGE:
      return {
        ...state,
        currentPage: Math.ceil(
          state.categoryProducts.length / state.productPerPage
        ),
      }
    case SORT_PRODUCTS:
      return {
        ...state,
        categoryProducts: payload.categoryProducts,
        sortProductState: payload.value,
      }
    default:
      return state
  }
}

export default categoryReducer
