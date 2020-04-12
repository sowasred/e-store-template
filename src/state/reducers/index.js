import menuReducer from "./menuReducer"
import loginReducer from "./loginReducer"

import { combineReducers } from "redux"

const allReducers = combineReducers({
  menuReducer,
  loginReducer,
})

export default allReducers
