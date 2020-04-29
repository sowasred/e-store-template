import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { useQuery } from "@apollo/react-hooks"

import {
  handleMobileOrDesktop,
  fillAllMenuTitles,
} from "../state/actions/menuActions"

import gql from "graphql-tag"
import { client } from "../context/ApolloClient"
import MobileNavigation from "./mobilenavigation"
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
  const { loading, error, data } = useQuery(TEST_QUERY)
  // console.info(loading, error, data, "loading, error, data")
  let windowInnerWidth = typeof window !== `undefined` ? window.innerWidth : 360
  const [currentScreenWidth, setCurrentScreenWidth] = React.useState(
    windowInnerWidth
  )

  const dispatch = useDispatch()

  const navCategories = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  )
  const isMobileState = useSelector(
    state => state.menuReducer.isMobile,
    shallowEqual
  )
  // const [menuTitles, setMenuTitles] = useState([{ title: "", slug: "" }])

  let tempArray = []
  const fillMenu = () => {
    let categories = data.allContentfulNavMenu.edges[0].node.categories
    let otherPages = data.allContentfulNavMenu.edges[0].node.otherPages

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
    dispatch(fillAllMenuTitles([...tempArray]))
  }
  if (typeof window !== `undefined`) {
    window.onscroll = function() {
      styleChanger()
    }
  }

  const styleChanger = () => {
    let classTemp = document.getElementsByClassName("navitself")
    // console.info(classTemp, "Cagd")
    if (
      (document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20) &&
      classTemp != "scrolling"
    ) {
      // document.getElementById("header").classList.add()
      // console.info("works")
    } else {
      // document.getElementById("header").classList.add()
    }
  }

  useEffect(() => {
    if (loading) {
      fillMenu()
    }
  }, [])

  let isMobile
  const mobileSize = 768

  useEffect(() => {
    if (currentScreenWidth > mobileSize) {
      isMobile = false
    } else {
      isMobile = true
    }
    dispatch(handleMobileOrDesktop({ isMobile, currentScreenWidth }))
  }, [currentScreenWidth])

  return (
    <nav className={navigationStyle.navitself} role="navigation">
      {!isMobileState ? (
        <div className={navigationStyle.innerNav}>
          <span className={navigationStyle.navItem}>
            <Link to="/">Home</Link>
          </span>
          {navCategories && navCategories.length > 0 ? (
            <React.Fragment>
              {navCategories.map(item => {
                return (
                  <span className={navigationStyle.navItem}>
                    <Link to={`/${item.slug}`}>{item.title}</Link>
                  </span>
                )
              })}
            </React.Fragment>
          ) : null}
        </div>
      ) : (
        <MobileNavigation />
      )}
    </nav>
  )
}

export default Navigation
