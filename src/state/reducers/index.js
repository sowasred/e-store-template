import menuReducer from "./menuReducer"
import loginReducer from "./loginReducer"
import categoryReducer from "./categoryReducer"
import filterReducer from "./filterReducer"

import { combineReducers } from "redux"

const allReducers = combineReducers({
  menuReducer,
  loginReducer,
  categoryReducer,
  filterReducer,
})

export default allReducers
