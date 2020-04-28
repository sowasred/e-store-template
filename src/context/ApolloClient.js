import fetch from "isomorphic-fetch"
// import { URI } from "gatsby-env-variables"

import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
  fetch,
  uri: process.env.URI,
})
