import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs}) => {
  if (blogs !== null) {
    const blog_components = blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
    return (
      <>
        {blog_components}
      </>
    )
  } else {
    return (<></>)
  }
}
export default Blogs