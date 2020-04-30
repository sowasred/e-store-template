/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import wrapWithProvider from "./wrap-with-provider.js"
export const wrapRootElement = wrapWithProvider

// import React from "react"
// import { Router } from "react-router-dom"
// import ApolloClient, { createNetworkInterface } from "apollo-client"
// import { ApolloProvider } from "@apollo/react-hooks"
// import fetch from "isomorphic-fetch"

// import ApolloClient, { InMemoryCache } from "apollo-boost"
// import createStore from "./src/state/createStore"
// import { Provider } from "react-redux"

// // endpoint comes from .env.development/production

// const store = createStore()

// // const client = new ApolloClient({
// //   uri: process.env.GATSBY_URI,
// //   initialState: window.__APOLLO_STATE__,
// // })
// const replaceRouterComponent = ({ history }) => {
//   const client = new ApolloClient({
//     fetch,
//     uri: process.env.GATSBY_URI,
//   })

//   const ConnectedRouterWrapper = ({ children }) => (
//     <ApolloProvider client={client}>
//       <Provider store={store}>
//         <Router history={history}>{children}</Router>
//       </Provider>
//     </ApolloProvider>
//   )

//   return ConnectedRouterWrapper
// }
// export default replaceRouterComponent
