import React from 'react'
import { Link, graphql } from 'gatsby'

const index = ({ data }) => {
  console.log(data)
  const products = data.allMarkdownRemark.nodes
  return (
    <>
      Hello world!
      <p>here is my products i have</p>
      {products.map((product, i) => (
        <div className="products" key={i}>
          <h3>{product.frontmatter.title}</h3>
          <h3>{product.frontmatter.path}</h3>
          <span>{product.frontmatter.date}</span>



        </div>

      ))}
    </>)
}

export default index

// export page query
export const query = graphql`
  query productPage {
    allMarkdownRemark {
      nodes {
        frontmatter {
          path
          date
          title
        }
        
      }
    }
  }
`