import { Link } from "gatsby"
import React, { useEffect, useState } from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const CatBreadCrumb = ({ title, slug }) => {
  const [breadcrumbs, setBreadcrumbs] = useState(["Home", title])

  console.info("titkle", title)

  return (
    <section className={mainpageStyle.breadcrumbsWrap}>
      {breadcrumbs && breadcrumbs.length > 0
        ? breadcrumbs.map((item, i) => {
            if (breadcrumbs.length > i + 1) {
              return (
                <React.Fragment>
                  <span>
                    <Link to={item === `Home` ? `/` : `/${slug}`}>{item} </Link>
                  </span>
                  <span>></span>
                </React.Fragment>
              )
            } else {
              return (
                <span>
                  <Link to={item === `Home` ? `/` : `/${slug}`}>{item} </Link>
                </span>
              )
            }
          })
        : null}
    </section>
  )
}

export default CatBreadCrumb
