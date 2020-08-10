import React from 'react'
import { useParams } from "react-router-dom"
import Blog from './Blog'
import { connect } from 'react-redux'



const BlogsList = (props) => {
  const userId = useParams().id
  const blogs = userId ? props.blogs.filter(blog => blog.user.id === userId) : props.blogs

  if (blogs) {
    return (
      <>
        <div>
          {blogs.map(blog =>
            <div key={blog.id}>
              <Blog key={blog.id} blog={blog} />
            </div>

          )}
        </div>
      </>
    )
  } else {
    return (
    <p>no blog is created by this user.</p>
    )
  }
}
  const mapStateToProps = (state) => {
    return {
      blogs: state.blogs,
      user: state.user
    }
  }

  const ConnectedBlogList = connect(mapStateToProps, null)(BlogsList)
  export default ConnectedBlogList  