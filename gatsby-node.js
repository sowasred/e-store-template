/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const Promise = require("bluebird")
const path = require("path")

// This is required for any markdown folder template files in our

// module.exports.onCreateNode = ({ node, actions }) => {
//   const slug = path.basename(node.findAbsolutePath, ".md")

//   createNodeField({
//     node,
//     name: "slug",
//     value: slug,
//   })
// }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog.js")
    const otherPages = path.resolve("./src/templates/otherPages.js")

    resolve(
      graphql(
        `
          {
            allContentfulBlog {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        console.info(result)

        const posts = result.data.allContentfulBlog.edges
        // const pages = result.data.allContentNavMenu.nodes.otherTitles
        posts.forEach(post => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })

        // pages.forEach(page => {
        //   createPage({
        //     path: `/${page.toLowerCase()}`,
        //     component: otherPages,
        //     context: {
        //       slug: page.toLowerCase(),
        //     },
        //   })
        // })
      })
    )
  })
}
