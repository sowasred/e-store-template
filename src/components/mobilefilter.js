import React, { useState, useEffect } from "react"

import Modal from "react-modal"
import gql from "graphql-tag"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { client } from "../context/ApolloClient"

import {
  handlePriceFilter,
  checkedPriceFilters,
  uncheckedPriceFilters,
} from "../state/actions/filterActions"

import {
  filterByPrice,
  filterByPriceAdd,
} from "../state/actions/categoryActions"

import filterStyle from "./styles/filter.module.scss"

const customStyles = {
  content: {
    top: "5vh",
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
    $greaterThan: Float
    $lessThan: Float
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

  const [minInterval, setMinInterval] = React.useState(50)
  const [priceFilter, setPriceFilter] = React.useState({})
  const dispatch = useDispatch()

  const sortProductState = useSelector(
    state => state.categoryReducer.sortProductState,
    shallowEqual
  )

  const checkedPriceFiltersState = useSelector(
    state => state.filterReducer.checkedPriceFilters,
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

  const handlePriceFilterClicked = e => {
    console.info("clicked", e.target.value)
    console.info("clicked", e.target.checked)

    let value = e.target.value
    if (value / minInterval === 1) {
      let greaterThanTemp = 0
      filterProductsPrice(e, greaterThanTemp, value)
    } else if (value / minInterval != 5) {
      filterProductsPrice(e, (value / minInterval - 1) * minInterval, value)
    } else if (value / minInterval === 5) {
      filterProductsPrice(e, value, 1000000)
    }
  }

  const filterProductsPrice = (e, greater, order) => {
    let isChecked = e.target.checked
    let chekboxValue = e.target.value
    if (isChecked) {
      client
        .query({
          query: FILTER_BY_PRICE,
          variables: {
            catSlugG: catSlug,
            valueG:
              sortProductState === "recommended" ||
              sortProductState === "highest-discount"
                ? "ASC"
                : sortProductState,
            greaterThan: parseFloat(greater),
            lessThan: parseFloat(order),
          },
        })
        .then(res => {
          console.info("oha", res.data.allContentfulProduct.edges)
          let categoryProducts = res.data.allContentfulProduct.edges
          if (checkedPriceFiltersState.length < 1 && isChecked) {
            dispatch(filterByPrice(categoryProducts))
          } else if (isChecked) {
            dispatch(filterByPriceAdd(categoryProducts))
          }
          dispatch(checkedPriceFilters(chekboxValue))
        })
    } else {
      let tempArr = checkedPriceFiltersState
      const result = tempArr.filter(item => item != chekboxValue)
      console.info("result", result)
      dispatch(checkedPriceFilters(chekboxValue))
    }

    checkCheckBoxes(e, chekboxValue)
  }

  const checkCheckBoxes = (e, spanId) => {
    let checkbox = document.getElementById(`${spanId}`)
    let checkIt = checkedPriceFiltersState.some(item => item === spanId)
    console.info(checkbox)
    if (checkIt) {
      checkbox.classList.remove("active")

      checkbox.classList.add("not-active")
    } else {
      checkbox.classList.add("active")
      checkbox.classList.remove("not-active")
    }
  }

  useEffect(() => {
    renderDynamicPriceFilter()
    // checkCheckBoxes()
  }, [checkedPriceFiltersState])

  const renderDynamicPriceFilter = (interval, rowNumber) => {
    return (
      <div>
        {Array(5)
          .fill(0, 0, 5)
          .map((item, index) => {
            if (index !== 4) {
              let tempvalue = (index + 1) * interval
              console.info("ozan", index)
              return (
                <div style={{ display: "flex" }}>
                  <span
                    id={(index + 1) * interval}
                    className={
                      checkedPriceFiltersState.some(item => item === tempvalue)
                        ? "active"
                        : "not-active"
                    }
                  ></span>
                  <input
                    onChange={e => {
                      handlePriceFilterClicked(e)
                    }}
                    index={(index + 1) * interval}
                    className={filterStyle.inputself}
                    type="checkbox"
                    name="Price Filter"
                    value={(index + 1) * interval}
                  />
                  <label className={filterStyle.labelself} for="Price Filter">
                    {index * interval}$ - ${(index + 1) * interval}
                  </label>
                </div>
              )
            } else if (index === 4) {
              return (
                <div>
                  <input
                    onChange={e => {
                      handlePriceFilterClicked(e)
                    }}
                    className={filterStyle.inputself}
                    type="checkbox"
                    name="Price Filter"
                    value={(index + 1) * interval}
                  />
                  <label className={filterStyle.labelself} for="Price Filter">
                    {(index + 1) * interval}$ - Above
                  </label>
                </div>
              )
            }
          })}
      </div>
    )
  }

  // Creatinf Filters Dynamically
  const renderFilters = () => {}

  useEffect(() => {}, [])

  return (
    <React.Fragment>
      <div onClick={toggleModal} className={filterStyle.filterWrap}>
        FILTER
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Filter Modal"
        closeTimeoutMS={200}
        // shouldCloseOnOverlayClick={true}
      >
        <div
          onClick={() => {
            closeModal()
          }}
          className={filterStyle.closeIcon}
        >
          &times;
        </div>

        <section>{renderDynamicPriceFilter(50)}</section>
      </Modal>
    </React.Fragment>
  )
}

export default MobileFilter
