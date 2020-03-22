import React from "react"

import fetch from "isomorphic-fetch"

import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
  fetch,
  uri: process.env.URI,
})
