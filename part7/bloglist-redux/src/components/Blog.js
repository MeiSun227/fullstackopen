import React from 'react'
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { CardContent, Button } from '@material-ui/core';
import { likeBlogAction, deleteBlogAction } from '../reducers/blogReducer'
import { useStyles } from '../materialUiStyle/buttonStyle';
import { useParams } from "react-router-dom"

const Blog = (props) => {
  const classes = useStyles()

  const handleLike = (blog) => {
    props.likeBlogAction(blog)
  }
  const handleDelete = (blog) => {
    props.deleteBlogAction(blog)
  }
  const blogId= useParams().id
  const blog = props.blogs.find(b => b.id === blogId)

  if (blog) {
    return (
      <Card>
        <CardContent key={blog.id}>
          <strong><p>{blog.title}</p></strong>
          <p>Author:{blog.author}</p>
          <p>Likes: {blog.likes}</p>
          <p>{blog.url}</p>
          <p>added by : {blog.user.name}</p>
          <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={() => handleLike(blog)}>Like</Button>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(blog)}>Delete</Button>
            <Button variant="contained" color="primary">Comment</Button>
          </div>
        </CardContent >
      </Card >
    )
  } else {
    return (
       <Card>
      <CardContent key={props.blog.id}>
        <strong><p>{props.blog.title}</p></strong>
        <p>Author:{props.blog.author}</p>
        <p>Likes: {props.blog.likes}</p>
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={() => handleLike(props.blog)}>Like</Button>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(props.blog)}>Delete</Button>
        </div>
      </CardContent >
    </Card >)
  }
}

const mapStateToProps = state => {
  return {
      blogs: state.blogs,
      user: state.user,
  };
};
const mapDispatchToProps = {
  likeBlogAction,
  deleteBlogAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
