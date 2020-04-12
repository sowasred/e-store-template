import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import { FETCHING_MENU_SUCCESS } from "../state/type"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import Modal from "react-modal"

import navigationStyle from "./styles/navigation.module.scss"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const MobileNavigation = props => {
  const dispatch = useDispatch()

  var subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00"
  // }

  const closeModal = () => {
    setIsOpen(false)
  }

  const navCategories = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  )

  return (
    <div className={navigationStyle.navigationMobile}>
      <div onClick={openModal}>Yarrak</div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className={navigationStyle.mobItem}>
          <Link to="/">Home</Link>
        </span>
        {navCategories && navCategories.length > 0 ? (
          <React.Fragment>
            {navCategories.map(item => (
              <span className={navigationStyle.navItem}>
                <Link to={`/${item.slug}`}>{item.title}</Link>
              </span>
            ))}
          </React.Fragment>
        ) : null}
      </Modal>
    </div>
  )
}

export default MobileNavigation
