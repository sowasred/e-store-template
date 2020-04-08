import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import gql from "graphql-tag"
import { client } from "../context/ApolloClient"
import navigationStyle from "./styles/navigation.module.scss"
const TEST_QUERY = gql`
  {
    allContentfulNavMenu {
      edges {
        node {
          categories {
            ... on ContentfulCategory {
              title {
                title
              }
              slug
              icon {
                fluid {
                  src
                  tracedSVG
                }
              }
              categoryDescription {
                categoryDescription
              }
            }
          }
          otherPages {
            title
            slug
          }
        }
      }
    }
  }
`

const Navigation = props => {
  const [menuTitles, setMenuTitles] = useState([{ title: "", slug: "" }])

  const fillMenu = () => {
    client
      .query({
        query: TEST_QUERY,
      })
      .then(res => {
        let categories = res.data.allContentfulNavMenu.edges[0].node.categories
        let otherPages = res.data.allContentfulNavMenu.edges[0].node.otherPages

        let tempArray = []

        console.info("ses", categories)
        // console.info("ses2", otherPages[0].title)
        categories.map(item => {
          tempArray.push({
            title: item.title.title,
            slug: item.slug,
          })
        })
        otherPages.map(item => {
          tempArray.push({
            title: item.title,
            slug: item.slug,
          })
        })
        setMenuTitles([...tempArray])
      })
  }

  useEffect(() => {
    fillMenu()
  }, [])

  return (
    <nav id={navigationStyle.navitself} role="navigation">
      <div className={navigationStyle.innerNav}>
        <span className={navigationStyle.navItem}>
          <Link to="/">Home</Link>
        </span>
        {menuTitles && menuTitles.length > 0 ? (
          <React.Fragment>
            {menuTitles.map(item => (
              <span className={navigationStyle.navItem}>
                <Link to={`/${item.slug}`}>{item.title}</Link>
              </span>
            ))}
          </React.Fragment>
        ) : null}
      </div>
    </nav>
  )
}

export default Navigation
