import React from 'react'

const Blog = ({ blog }) => {

  return (
    <>
       <p> <a href ="#">{blog.url}</a></p>
        <div>
        {blog.likes} likes
        <button>like</button>
      </div>
        <p>added by {blog.author}</p>
    </>
  )
}
export default Blog