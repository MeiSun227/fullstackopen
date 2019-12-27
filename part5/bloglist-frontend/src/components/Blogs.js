import React from 'react'
import Blog from './Blog'
import TogglableBlogDetail from './TogglableBlogDetail'


const Blogs = ({ blogs, handleLikeChange, handleDeleteBlog }) => {
  if (blogs !== null) {
    blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))
    const blog_components = blogs.map((blog) => <TogglableBlogDetail key={blog.id} title={blog.title}><Blog key={blog.id} blog={blog} handleLikeChange={handleLikeChange} handleDeleteBlog={handleDeleteBlog} /></TogglableBlogDetail>)
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