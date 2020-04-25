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
      {/* <div className={mainpageStyle.heroText} id={mainpageStyle.middle}>
        <h2>UP TO 60% OFF</h2>
      </div> */}

      <a className={mainpageStyle.heroImage}>
        <img src={womenImage} alt={womeImageTitle} />
        <h2 className={mainpageStyle.heroText} id={mainpageStyle.bottom}>
          FEEL THE DERRY
        </h2>
      </a>
      <a className={mainpageStyle.heroImage}>
        <img src={menImage} alt={menImageTitle} />
        <h2 className={mainpageStyle.heroText} id={mainpageStyle.top}>
          ETHIC & CHIC
        </h2>
      </a>
    </section>
  )
}

export default MainpageIntro
