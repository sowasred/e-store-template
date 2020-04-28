import fetch from "isomorphic-fetch"

import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
  fetch,
  uri: process.env.GATSBY_URI,
})
