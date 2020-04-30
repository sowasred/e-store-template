import {
  FETCHING_MENU_SUCCESS,
  FETCHING_FOOTER_LINKS,
  IS_MOBILE_CHECK,
} from "../type.js"

const initialState = {
  navCats: [],
  footerCats: [],
  isMobile: true,
  currentScreenWidth: 0,
}

const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case IS_MOBILE_CHECK:
      return {
        ...state,
        isMobile: payload.isMobile,
        currentScreenWidth: payload.currentScreenWidth,
      }
    case FETCHING_MENU_SUCCESS:
      return {
        ...state,
        navCats: payload,
      }

    case FETCHING_FOOTER_LINKS:
      return {
        ...state,
        footerCats: payload.footerCats,
      }
    default:
      return state
  }
}

export default menuReducer
