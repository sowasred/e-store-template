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
    <section className={mainpageStyle.hero}>
      <div className={mainpageStyle.heroText}>
        <h2>Feel the Difference?</h2>
      </div>
      <a className={mainpageStyle.heroImage}>
        <img src={womenImage} alt={womeImageTitle} />
      </a>
      <a className={mainpageStyle.heroImage}>
        <img src={menImage} alt={menImageTitle} />
      </a>
    </section>
  )
}

export default MainpageIntro
