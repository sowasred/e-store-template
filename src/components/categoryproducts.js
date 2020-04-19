import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import catProductsStyle from "./styles/categoryproducts.module.scss"

const CategoryProducts = ({ catSlug, products }) => {
  console.info("category Products ", products)
  return (
    <section className={catProductsStyle.catWraper}>
      {products && products.length > 0
        ? products.map(item => {
            return (
              <article>
                <Link to={`${catSlug}/${item.node.slug}`}>
                  <img
                    src={item.node.image[0].fluid.src}
                    alt={item.node.productName.productName}
                  />
                  <h4>{item.node.productName.productName}</h4>
                </Link>
                <aside>
                  <span>CA${item.node.price.toFixed(2)}</span>
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
