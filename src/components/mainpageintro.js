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
      <a className={mainpageStyle.heroImage}>
        <img
          src={womenImage}
          className={mainpageStyle.down}
          alt={womeImageTitle}
        />
        <h2 className={mainpageStyle.heroText}>FEEL THE DERRY</h2>
      </a>
      <a className={mainpageStyle.heroImage}>
        <img src={menImage} alt={menImageTitle} />
        <h2 className={mainpageStyle.heroText}>ETHIC & CHIC</h2>
      </a>
    </section>
  )
}

export default MainpageIntro
