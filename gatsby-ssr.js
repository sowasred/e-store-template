/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

// export { wrapRootElement } from "./src/apollo/wrap-root-element"

import React from "react"
import { ApolloProvider } from "react-apollo"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import { client } from "./src/context/ApolloClient"

// gatsby-ssr is required for build regardless if you plan to support SSR
export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => (
    <ApolloProvider client={client}>
      <GlobalContextProvider>{bodyComponent}</GlobalContextProvider>
    </ApolloProvider>
  )

  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
