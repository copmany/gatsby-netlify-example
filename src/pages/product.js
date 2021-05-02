import React from 'react'
import { Link, graphql } from 'gatsby'

const product = ({ data }) => {
  console.log(data)
  const productdata = data.allMarkdownRemark.nodes
  return (
    <>


      {productdata.map((productdata, index) => (
        <div className="products" key={+ "A" + index}>
          <h3>{productdata.frontmatter.heading}</h3>
          <span>{productdata.frontmatter.description}</span>

          <img src={productdata.frontmatter.image}></img>

        </div>

      ))}
      <p>what people say</p>
      {productdata.map((productdata, index) => (
        <div className="products" key={+ "Q" + index}>


          {productdata.frontmatter.testimonials.map(authorItem =>
            <>
              <p>{authorItem.author}</p><p>{authorItem.quote}</p></>
          )}
        </div>

      ))}


    </>)
}

export default product

// export page query
export const query = graphql`
  query  {
    allMarkdownRemark(filter: {frontmatter: {heading: {ne: null}}}) {
      nodes {
        frontmatter {
          description
          heading
          image
          testimonials {
            author
            quote
          }
        }
      }
    }
  }
`