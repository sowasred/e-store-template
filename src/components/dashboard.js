import React from "react"

import navigationStyle from "./styles/navigation.module.scss"
import user from "../images/user.svg"
import heart from "../images/heart.svg"
import canada from "../images/canada.svg"
import bag from "../images/bag.svg"
import search from "../images/search.svg"

const Dashboard = () => {
  return (
    <div className={navigationStyle.dashboardWrapper}>
      <div className={navigationStyle.navItem2}>
        <h3>Sign in</h3>
        <img src={user}></img>
      </div>
      <div className={navigationStyle.navItem2}>
        <h3>Favorites</h3>
        <img src={heart}></img>
      </div>
      <div className={navigationStyle.navItem2}>
        <h3>Search</h3>
        <img src={search}></img>
      </div>
      <div className={navigationStyle.navItem2}>
        <h3>Canada</h3>
        <img className={navigationStyle.flag} src={canada}></img>
      </div>
      <div className={navigationStyle.navItem2}>
        <h3>Bag</h3>
        <img src={bag}></img>
      </div>
    </div>
  )
}

export default Dashboard
