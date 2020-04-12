import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_LOGIN,
  USER_DATA_SUCCESS,
  COOKIE_WINDOW_SHOW,
} from "../type"

const initialState = {
  loginName: "",
  securityToken: "",
  lat: 40.6976701,
  lng: -74.2598696,
  userData: [],
  userInfo: {
    default: true,
    countryCode: "ca",
    countryName: "Canada",
    city: "Barrie",
    lat: 40.6976701,
    lng: -74.2598696,
    regioncode: "ON",
    regionName: "Ontario",
  },
  cookieWindow: null,
}

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DATA_SUCCESS:
      return {
        ...state,
        userInfo: {
          default: false,
          countryCode: payload.countrycode.toLowerCase(),
          countryName: payload.countryname,
          city: payload.city,
          lat: payload.latitude,
          lng: payload.longitude,
          regioncode: payload.regioncode,
          regionName: payload.regionname,
        },
      }
    default:
      return state
  }
}

export default loginReducer
