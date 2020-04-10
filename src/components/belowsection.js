import { Link } from "gatsby"
import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"
import imgsrc from "../images/leather.jpg"

const BelowSection = ({
  firstImage,
  firstImageTitle,
  secondImage,
  secondImageTitle,
  longDescription,
}) => {
  return (
    <section className={mainpageStyle.belowsection}>
      <img
        className={mainpageStyle.belowimg}
        src={firstImage}
        alt={firstImageTitle}
      />
      <h2 className={mainpageStyle.longDescription}>{longDescription}</h2>
      <img
        className={mainpageStyle.belowimg}
        src={secondImage}
        alt={secondImageTitle}
      />
    </section>
  )
}

export default BelowSection
