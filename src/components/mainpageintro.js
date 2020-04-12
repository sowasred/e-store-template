import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const MainpageIntro = ({
  womenImage,
  womeImageTitle,
  menImage,
  menImageTitle,
}) => {
  return (
    <section className={mainpageStyle.mainsection}>
      <div className={mainpageStyle.mainsectimg}>
        <img src={womenImage} alt={womeImageTitle} />
        {/* <button className={mainpageStyle.mainButton}>{womeImageTitle}</button> */}
      </div>
      <div className={mainpageStyle.mainsectimg}>
        <img src={menImage} alt={menImageTitle} />
        {/* <button className={mainpageStyle.mainButton}>{menImageTitle}</button> */}
      </div>
    </section>
  )
}

export default MainpageIntro
