import React from "react"
import { graphql, Link } from "gatsby"

import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { client } from "../context/ApolloClient"

// export const query = graphql`
//   query {
//     allContentfulNavMenu {
//       nodes {
//         otherTitles
//       }
//     }
//   }
// `
// import { ApolloProvider } from "react-apollo"

const TEST_QUERY = gql`
  {
    allContentfulNavMenu {
      nodes {
        otherTitles
      }
    }
  }
`

// export const GATSBY_QUERY = graphql`
//     allContentfulNavMenu {
//       nodes {
//         categories {
//           ... on ContentfulCategory {
//             id
//             categoryDescription {
//               childMarkdownRemark {
//                 html
//               }
//             }
//             childContentfulCategoryTitleTextNode {
//               title
//             }
//             icon {
//               fluid {
//                 src
//                 tracedSVG
//               }
//             }
//           }
//         }
//         otherTitles
//       }
//     }
// `

const Navigation = props => {
  // const { loading, error, data } = useQuery(TEST_QUERY)
  client
    .query({
      query: TEST_QUERY,
    })
    .then(res => console.info(res))
  // console.info("nnn", data)
  return (
    <nav role="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* {props.data.allContentfulNavMenu.nodes.map(item => (
          <li>{item.otherTitles}</li>
        ))} */}
      </ul>
    </nav>
  )
}

export default Navigation
