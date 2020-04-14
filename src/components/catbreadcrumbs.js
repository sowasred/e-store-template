import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import breadCrumbStyle from "./styles/breadcrumb.module.scss"

const CatBreadCrumb = ({ title, slug }) => {
  const [breadcrumbs, setBreadcrumbs] = useState(["Home", title])

  const isMobileState = useSelector(
    state => state.menuReducer.isMobile,
    shallowEqual
  )

  console.info("titkle", title)

  return (
    <nav className={breadCrumbStyle.breadcrumbsWrap}>
      {isMobileState && breadcrumbs && breadcrumbs.length > 0
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
    </nav>
  )
}

export default CatBreadCrumb
