/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// export { wrapRootElement } from "./src/apollo/wrap-root-element"

// import React from "react"
// import { ApolloProvider } from "react-apollo"
// import { client } from "./src/context/ApolloClient"

// export const wrapRootElement = ({ element }) => {
//   return () => <ApolloProvider client={client}>{element}</ApolloProvider>
// }
// export const replaceRouterComponent = () => {
//   const ConnectedRouterWrapper = ({ children }) => (
//     <ApolloProvider client={client}>
//       <GlobalContextProvider>{children}</GlobalContextProvider>
//     </ApolloProvider>
//   )
import wrapWithProvider from "./wrap-with-provider.js"
export const wrapRootElement = wrapWithProvider
