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
  fetchCategories,
  filterByPriceAdd,
  filterByPriceRemove,
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
        price: { gt: $greaterThan, lte: $lessThan }
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

const MobileFilter = ({ catSlug, products }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const [minInterval, setMinInterval] = React.useState(50)
  const dispatch = useDispatch()

  const checkedPriceFiltersState = useSelector(
    state => state.filterReducer.checkedPriceFilters,
    shallowEqual
  )
  const sortProductState = useSelector(
    state => state.categoryReducer.sortProductState,
    shallowEqual
  )
  const navCategoryState = useSelector(
    state => state.categoryReducer.navCategory,
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
    filterProductsPrice(e)
    let value = e.target.value
    // if (value / minInterval === 1) {
    //   let greaterThanTemp = 0
    //   queryProducts(e, greaterThanTemp, value)
    // } else if (value / minInterval != 5) {
    //   queryProducts(e, (value / minInterval - 1) * minInterval, value)
    // } else if (value / minInterval === 5) {
    //   queryProducts(e, value, 1000000)
    // }
  }

  const filterProductsPrice = e => {
    let chekboxValue = e.target.value
    dispatch(checkedPriceFilters({ value: chekboxValue }))
  }

  const renderDynamicPriceFilter = (interval, rowNumber) => {
    return (
      <div>
        {Array(5)
          .fill(0, 0, 5)
          .map((item, index) => {
            if (index !== 4) {
              return (
                <div style={{ display: "flex" }}>
                  <span
                    id={index}
                    className={
                      checkedPriceFiltersState.some(
                        item => parseInt(item.value) === (index + 1) * interval
                      )
                        ? "active"
                        : "not-active"
                    }
                  ></span>
                  <input
                    onChange={e => {
                      handlePriceFilterClicked(e)
                    }}
                    index={index}
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
                <div style={{ display: "flex" }}>
                  <span
                    id={index}
                    className={
                      checkedPriceFiltersState.some(
                        item => parseInt(item.value) === (index + 1) * interval
                      )
                        ? "active"
                        : "not-active"
                    }
                  ></span>
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
                    {index * interval}$ - Above
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

  useEffect(() => {
    dispatch(uncheckedPriceFilters())
  }, [navCategoryState, sortProductState])

  // const queryProducts = (e, greater, order) => {
  //   let chekboxValue = e.target.value
  //   let isChecked = e.target.checked

  //   let categoryProducts = []

  //   let priceIsChecked = checkedPriceFiltersState.some(
  //     item => item.value === chekboxValue
  //   )
  //   console.info("priceIsChecked", checkedPriceFiltersState)

  //   client
  //     .query({
  //       query: FILTER_BY_PRICE,
  //       variables: {
  //         catSlugG: catSlug,
  //         valueG:
  //           sortProductState === "recommended" ||
  //           sortProductState === "highest-discount"
  //             ? "ASC"
  //             : sortProductState,
  //         greaterThan: parseFloat(greater),
  //         lessThan: parseFloat(order),
  //       },
  //     })
  //     .then(res => {
  //       categoryProducts = res.data.allContentfulProduct.edges
  //       console.info("res", res)

  //       console.info("OZAN", checkedPriceFiltersState)
  //       if (checkedPriceFiltersState.length === 0) {
  //         console.info("ozan muldur ", checkedPriceFiltersState)
  //         console.info("ozan muldur ", categoryProducts)
  //         dispatch(filterByPrice(categoryProducts))
  //       } else if (checkedPriceFiltersState.length > 0 && !priceIsChecked) {
  //         console.info("ozan muldur99 ", categoryProducts)

  //         dispatch(filterByPriceAdd({ categoryProducts, chekboxValue }))
  //       } else if (priceIsChecked) {
  //         console.info("ozan muldur200 ", categoryProducts)

  //         dispatch(filterByPriceRemove(categoryProducts))
  //       }
  //     })
  // }

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
        {modalIsOpen ? renderDynamicPriceFilter(50) : null}
      </Modal>
    </React.Fragment>
  )
}

export default MobileFilter
