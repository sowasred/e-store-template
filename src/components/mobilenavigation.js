import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import { FETCHING_MENU_SUCCESS } from "../state/type"

import { useSelector, shallowEqual, useDispatch } from "react-redux"
import menu from "../images/menu.svg"
import Modal from "react-modal"
import user from "../images/user.svg"
import heart from "../images/heart.svg"
import search from "../images/search.svg"
import canada from "../images/canada.svg"
import bag from "../images/bag.svg"

import navigationStyle from "./styles/navigation.module.scss"

const customStyles = {
  content: {
    top: "0",
    left: "0",
    position: "absolute",
    margin: "0",
    width: "60vw",
    height: "100vh",
    // transform: "translate(-50%, -50%)",
  },
}

const MobileNavigation = props => {
  const dispatch = useDispatch()

  var subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const toggleModal = () => {
    modalIsOpen ? setIsOpen(false) : setIsOpen(true)
  }
  const navCategories = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  )

  return (
    <div className={navigationStyle.navigationMobile}>
      <div onClick={toggleModal} className={navigationStyle.hamburgerButton}>
        <img src={menu}></img>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <span className={navigationStyle.closeButton} onClick={closeModal}>
          X
        </span> */}
        <span className={navigationStyle.mobItem}>
          <Link to="/" className={navigationStyle.link}>
            Home
          </Link>
        </span>
        {navCategories && navCategories.length > 0 ? (
          <React.Fragment>
            {navCategories.map(item => (
              <span className={navigationStyle.navItem}>
                <Link to={`/${item.slug}`}>{item.title}</Link>
              </span>
            ))}
            <span className={navigationStyle.navItem}>
              <a>Sign in</a>
            </span>
            <span className={navigationStyle.navItem}>
              <a>Favorites</a>
            </span>
            <span className={navigationStyle.navItem}>
              <a>Canada</a>
            </span>
          </React.Fragment>
        ) : null}
      </Modal>
    </div>
  )
}

export default MobileNavigation
