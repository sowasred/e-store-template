/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, seo }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  )
  console.info("ozannnnnn", seo)

  // const metaDescription = seo.description.content[0].content[0].value

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={site.siteMetadata.author}
      titleTemplate={site.siteMetadata.author}
      meta={[
        {
          name: `description`,
          content: site.siteMetadata.author,
        },
        {
          name: `keywords`,
          content: site.siteMetadata.author,
        },
        {
          name: `canonical`,
          content: site.siteMetadata.author,
        },
        {
          property: `og:title`,
          content: site.siteMetadata.author,
        },
        {
          property: `og:description`,
          content: site.siteMetadata.author,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:description`,
          content: site.siteMetadata.author,
        },
      ].concat(meta)}
    />
  )
}

// SEO.defaultProps = {
//   lang: `en`,
//   meta: [],
//   description: ``,
// }

// SEO.propTypes = {
//   description: PropTypes.string,
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   title: PropTypes.string.isRequired,
// }

export default SEO
