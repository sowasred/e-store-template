/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import wrapWithProvider from "./wrap-with-provider.js"
export const wrapRootElement = wrapWithProvider
// import createStore from "./src/state/createStore"
// import { Provider } from "react-redux"
// import ApolloClient from "apollo-boost"

// import React from "react"
// import { renderToString } from "react-dom/server"
// // import ApolloClient from "apollo-client"

// import fetch from "isomorphic-fetch"

// // import ApolloClient from "apollo-boost"
// import { getDataFromTree } from "react-apollo"
// import { ApolloProvider } from "@apollo/react-hooks"

// const client = new ApolloClient({
//   fetch,
//   uri: process.env.GATSBY_URI,
// })

// const store = createStore()

// const replaceRenderer = ({
//   bodyComponent,
//   replaceBodyHTMLString,
//   setHeadComponents,
// }) =>
//   new Promise(resolve => {
//     const ApolloQueries = (
//       <ApolloProvider client={client}>
//         <Provider store={store}>{bodyComponent}</Provider>
//       </ApolloProvider>
//     )
//     // getDataFromTree walks ApolloQueries tree for all Apollo GQL queries
//     // It runs the queries and mutates client object
//     getDataFromTree(ApolloQueries).then(() => {
//       // renders ApolloQueries to string and then inserts it into the page
//       replaceBodyHTMLString(renderToString(ApolloQueries))
//       // sets head components with styled components and apollo state
//       setHeadComponents([makeApolloState(client)])
//       resolve()
//     })
//   })
// export default replaceRenderer
