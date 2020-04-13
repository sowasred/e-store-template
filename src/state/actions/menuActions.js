import { IS_MOBILE_CHECK, FETCHING_MENU_SUCCESS } from "../type"

export const handleMobileOrDesktop = payload => ({
  type: IS_MOBILE_CHECK,
  payload: payload,
})

export const fillAllMenuTitles = payload => ({
  type: FETCHING_MENU_SUCCESS,
  payload: payload,
})
