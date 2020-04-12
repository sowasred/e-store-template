import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const FeaturedProduct = ({ featuredProducts }) => {
  console.info("pro", featuredProducts)

  return (
    <React.Fragment>
      <section className={mainpageStyle.productsWrapper}>
        {/* {featuredProducts && featuredProducts.length > 0
          ? renderProducts()
          : null} */}
        {featuredProducts && featuredProducts.length > 0
          ? featuredProducts.map(item => {
              let imageUrl = `https:${item.image[0].fluid.src}`
              return (
                <div className={mainpageStyle.productWrapper}>
                  <img src={imageUrl} alt="product image" />
                  <h3 className={mainpageStyle.productName}>
                    {item.productName.productName}
                  </h3>
                </div>
              )
            })
          : null}
      </section>
    </React.Fragment>
  )
}

export default FeaturedProduct
