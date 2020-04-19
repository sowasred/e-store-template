import { createStore, combineReducers, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import reducer from "./reducers/index"

// preloadedState will be passed in by the plugin
export default preloadedState => {
  return createStore(reducer, preloadedState, composeWithDevTools())
}
