import React from 'react';
import { connect } from 'react-redux';
import { createBlogAction } from '../reducers/blogReducer';
import { Container, Button, TextField } from '@material-ui/core';
import { useformStyles } from '../materialUiStyle/formStyle';

const BlogForm = (props) => {
  const classes = useformStyles()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title: event.target.title.value, author: event.target.author.value, url: event.target.url.value }
    event.target.reset()
    props.createBlogAction(blogObject)
  }

  return (
    <>
      <div>
        <Container>
          <h2>Add blog:</h2>
          <form onSubmit={addBlog}>
            <div><TextField label="title" name="title"></TextField></div>
            <div><TextField label="author" name="author" ></TextField></div>
            <div> <TextField label="url" name="url" > </TextField></div>
            <Button className={classes.button} variant="contained" color="primary" type="submit">create</Button>
          </form>
        </Container>
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBlogAction: value => {
      dispatch(createBlogAction(value))
    },
  }
}

const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)


export default ConnectedBlogForm