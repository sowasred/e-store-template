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
      <a className={mainpageStyle.mainsectimg}>
        <img src={womenImage} alt={womeImageTitle} />
      </a>
      <a className={mainpageStyle.mainsectimg}>
        <img src={menImage} alt={menImageTitle} />
      </a>
    </section>
  )
}

export default MainpageIntro
