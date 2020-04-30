import React from "react"
import { Provider } from "react-redux"

import { ApolloProvider } from "@apollo/react-hooks"

import createStore from "./src/state/createStore"

import fetch from "isomorphic-fetch"

import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
  fetch,
  uri: process.env.GATSBY_URI,
})

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore()
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{element}</Provider>
    </ApolloProvider>
  )
}
