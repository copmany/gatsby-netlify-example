import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'

const Product = ({ data }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: ""


  })
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }
  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value

    })
  }
  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formState })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  }
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
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>Name:
      <input id="name" type="text" name="name" onChange={handleChange} value={formState.name} /></label>
        </p>
        <p>
          <label>Email:
    <input id="email" type="email" name="email" onChange={handleChange} value={formState.email} />

          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  )
}

export default Product

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