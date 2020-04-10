import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const MailSignup = ({ description }) => {
  return (
    <section className={mainpageStyle.mainsignin}>
      <h3 className={mainpageStyle.maindesc}>{description}</h3>
      <div className={mainpageStyle.mainForm}>
        <input
          placeholder="Type your email for sign up."
          type="text"
          name="name"
        />
        <div className={mainpageStyle.option1}>Men</div>
        <div className={mainpageStyle.option2}>Women</div>
      </div>
    </section>
  )
}

export default MailSignup
