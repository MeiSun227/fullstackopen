import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikeChange, handleDeleteBlog }) => {
  if (blog.user.username === user.username) {
    return (
      <>
        <p> <a href="#">{blog.url}</a></p>
        <div>
          {blog.likes} likes
  <button onClick={(event) => handleLikeChange(blog, event)}>like</button>
        </div>
        <p>added by {blog.author}</p>
        <div>
          <button onClick={(event) => handleDeleteBlog(blog, event)}>Remove</button>
        </div>
      </>
    )
  } else {
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
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeChange: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}
export default Blog