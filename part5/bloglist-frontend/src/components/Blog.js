import React from 'react'

const Blog = ({ blog,handleLikeChange}) => {

  return (
    <>
      <p> <a href="#">{blog.url}</a></p>
      <div>
        {blog.likes} likes
  <button onClick={(event) => handleLikeChange(blog, event)}>like</button>
      </div>
      <p>added by {blog.author}</p>
    </>
  )
}
export default Blog