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
import rightArrow from "../images/chevron-right-solid.svg"

import navigationStyle from "./styles/navigation.module.scss"

const customStyles = {
  content: {
    display: "block",
    overflow: "auto",
    position: "absolute",
    top: "40px",
    left: "0",
    margin: "0",
    top: "15px",
    bottom: "0",
    zIndex: "9",
    width: "300px",
    height: "100vh",
    listStyle: "none",
    textDecoration: "none",
    // flexDirection: "column",
    // justifyContent: "space-evenly",
    background: "#f8f8f8",
    // pointer-events: auto;
    // overscroll-behavior: contain;
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
        contentLabel="Mobile Navigation Modal"
        closeTimeoutMS={200}
      >
        <ul className={navigationStyle.list}>
          <li className={navigationStyle.mobItem}>
            <Link to="/" className={navigationStyle.link}>
              Home
            </Link>
          </li>
          {navCategories && navCategories.length > 0 ? (
            <React.Fragment>
              {navCategories.map(item => (
                <li
                  className={(navigationStyle.navItem, navigationStyle.mobItem)}
                >
                  <Link to={`/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
              <li
                className={(navigationStyle.navItem, navigationStyle.mobItem)}
              >
                <a>Sign in</a>
              </li>
              <li
                className={(navigationStyle.navItem, navigationStyle.mobItem)}
              >
                <a>Favorites</a>
              </li>
              <li
                className={(navigationStyle.navItem, navigationStyle.mobItem)}
              >
                <a>Canada</a>
              </li>
            </React.Fragment>
          ) : null}
        </ul>
      </Modal>
    </div>
  )
}

export default MobileNavigation
