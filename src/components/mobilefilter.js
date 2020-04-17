import React, { useState, useEffect } from "react"

import Modal from "react-modal"
import gql from "graphql-tag"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { client } from "../context/ApolloClient"

import { handlePriceFilter } from "../state/actions/filterActions"

import filterStyle from "./styles/filter.module.scss"

const customStyles = {
  content: {
    top: "0",
    right: "0",
    position: "absolute",
    margin: "0",
    width: "80vw",
    height: "100vh",
    // transform: "translate(-50%, -50%)",
  },
}

const FILTER_BY_PRICE = gql`
  query filterProductsByPrice(
    $catSlugG: String
    $valueG: [SortOrderEnum]
    $greaterThan: [float]
    $lessThan: [float]
  ) {
    allContentfulProduct(
      filter: {
        price: { gt: $greaterThan, lt: $lessThan }
        categories: { elemMatch: { slug: { eq: $catSlugG } } }
      }
      sort: { fields: price, order: $valueG }
    ) {
      edges {
        node {
          price
          slug
          discountedPrice
          image {
            fluid {
              src
            }
            title
          }
          productName {
            productName
          }
          quantity
          sku
        }
      }
      totalCount
    }
  }
`

const SORT_QUERY = gql`
  query sortProducts($catSlugG: String, $valueG: [SortOrderEnum]) {
    allContentfulProduct(
      filter: { categories: { elemMatch: { slug: { eq: "women" } } } }
    ) {
      edges {
        node {
          price
        }
      }
      totalCount
    }
  }
`

// const SORT_QUERY = gql`
//   query sortProducts($catSlugG: String, $valueG:) {
//     allContentfulProduct(filter: {price: {gt: 0, lt: 15}}, sort: {fields: price, order: ASC}) {
//       edges {
//         node {
//           price
//           slug
//           discountedPrice
//           image {
//             fluid {
//               src
//             }
//             title
//           }
//           productName {
//             productName
//           }
//           quantity
//           sku
//         }
//       }
//       totalCount
//     }
//   }
// `

const MobileFilter = ({ catSlug, products }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [minInterval, setMinInterval] = React.useState(25)

  console.info(products, "maxmin")
  const sortProductState = useSelector(
    state => state.categoryReducer.sortProductState,
    shallowEqual
  )

  const openModal = () => {
    setIsOpen(true)
  }
  const toggleModal = () => {
    modalIsOpen ? setIsOpen(false) : setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  // Creatinf Filters Dynamically

  const minPriceFind = () => {
    let tempArray = []
    products.map(item => {
      console.info(item.node.price)
      tempArray.push(item.node.price)
    })

    let minnumber = Math.min(tempArray)
    setMinInterval(minnumber)
  }

  useEffect(() => {
    minPriceFind()
  }, [])

  return (
    <div onClick={toggleModal} className={filterStyle.filterWrap}>
      FILTER
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Filter Modal"
        closeTimeoutMS={200}
      >
        <div>Yarrak</div>
      </Modal>
    </div>
  )
}

export default MobileFilter
