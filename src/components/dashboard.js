import React from "react"

import navigationStyle from "./styles/navigation.module.scss"
import user from "../images/user.svg"
import heart from "../images/heart.svg"
import canada from "../images/canada.svg"
import bag from "../images/bag.svg"
import search from "../images/search.svg"

const Dashboard = () => {
  return (
    <div className={navigationStyle.dashboard}>
      <div className={navigationStyle.dashboardElements}>
        <span className={navigationStyle.navItem}>
          <a>Sign in</a>
          <img src={user}></img>
        </span>
        <span className={navigationStyle.navItem}>
          <a>Favorites</a>
          <img src={heart}></img>
        </span>
        <span className={navigationStyle.navItem}>
          <a>Search</a>
          <img src={search}></img>
        </span>
        <span className={navigationStyle.navItem}>
          <a>Canada</a>
          <img className={navigationStyle.flag} src={canada}></img>
        </span>
        <span className={navigationStyle.navItem}>
          <a>Bag</a>
          <img src={bag}></img>
        </span>
      </div>
    </div>
  )
}

export default Dashboard
