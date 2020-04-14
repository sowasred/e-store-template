import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import catProductsStyle from "./styles/categoryproducts.module.scss"

const CategoryProducts = ({ catSlug, products }) => {
  console.info("YARRAK", products)
  return (
    <section className={catProductsStyle.catWraper}>
      {products && products.length > 0
        ? products.map(item => {
            return (
              <article>
                <Link to={`${catSlug}/${item.slug}`}>
                  <img
                    src={item.image[0].fluid.src}
                    alt={item.productName.productName}
                  />
                  <h4>{item.productName.productName}</h4>
                </Link>
                <aside>
                  <span>CA${item.price}</span>
                  {/* <span>CA${item.discountedPrice}</span> */}
                </aside>
              </article>
            )
          })
        : null}
    </section>
  )
}

export default CategoryProducts
