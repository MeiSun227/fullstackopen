import React from 'react'
import Blog from './Blog'
import TogglableBlogDetail from './TogglableBlogDetail'


const Blogs = ({blogs,handleLikeChange}) => {
  if (blogs !== null) {
    const blog_components = blogs.map((blog) => <TogglableBlogDetail title={blog.title}><Blog key={blog.id} blog={blog} handleLikeChange={handleLikeChange}/></TogglableBlogDetail>)
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