import React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import lastPage from "../images/angel-right-circle-thin.svg"
import firstPage from "../images/angel-left-circle-thin.svg"
import previousPage from "../images/angel-left-thin.svg"
import nextPage from "../images/angel-right-thin.svg"
import topPage from "../images/angel-up-thin.svg"

import {
  nextPageShow,
  previousPageShow,
  firstPageShow,
  lastPageShow,
} from "../state/actions/categoryActions"

import paginationStyle from "./styles/pagination.module.scss"

const Pagination = ({
  productPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = []
  const dispatch = useDispatch()

  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i)
  }
  const triggerScroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <nav>
      <span
        className={paginationStyle.topArrowWrap}
        onClick={() => triggerScroll()}
      >
        <img className={paginationStyle.topArrow} src={topPage} />
      </span>
      <ul className={paginationStyle.paginationWrap}>
        {currentPage === 1 ? (
          <li>
            <img
              style={{ opacity: "0.3" }}
              className={paginationStyle.endButtons}
              src={firstPage}
            />
          </li>
        ) : (
          <li onClick={() => dispatch(firstPageShow())}>
            <img className={paginationStyle.endButtons} src={firstPage} />
          </li>
        )}

        {currentPage === 1 ? (
          <li className={paginationStyle.previousdis}>
            <img src={previousPage} />
            <p>Previous</p>
          </li>
        ) : (
          <li
            className={paginationStyle.previousButton}
            onClick={() => dispatch(previousPageShow())}
          >
            <img src={previousPage} alt="previous page" name="previous page" />
            <p>Previous</p>
          </li>
        )}

        {/* {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a
              onClick={e => {
                e.preventDefault()
                paginate(number)
              }}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))} */}

        <li
          className={paginationStyle.currentPagestyle}
          key={currentPage}
        >{`Page ${currentPage} of ${pageNumbers.length}`}</li>

        {currentPage === Math.ceil(totalProducts / productPerPage) ? (
          <li
            className={paginationStyle.nextDisable}
            onClick={() => dispatch(nextPageShow())}
          >
            <p>Next </p>
            <img style={{ opacity: "0.3" }} src={nextPage} />
          </li>
        ) : (
          <li
            className={paginationStyle.nextButton}
            onClick={() => dispatch(nextPageShow())}
          >
            <p>Next </p>
            <img src={nextPage} />
          </li>
        )}

        {currentPage === Math.ceil(totalProducts / productPerPage) ? (
          <li>
            <img
              style={{ opacity: "0.3" }}
              className={paginationStyle.endButtons}
              src={lastPage}
            />
          </li>
        ) : (
          <li onClick={() => dispatch(lastPageShow())}>
            <img className={paginationStyle.endButtons} src={lastPage} />
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
