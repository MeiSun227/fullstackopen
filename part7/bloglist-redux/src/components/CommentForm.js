
import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { addCommentAction } from '../reducers/blogReducer'

const CommentForm = (props) => {
  const createComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.reset()
    props.addCommentAction(props.blog, { content: content })
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createComment}>
        <div>
          <div><TextField label="comment" name="comment"></TextField></div>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = { addCommentAction }

const ConnectedCommentForm = connect(mapStateToProps, mapDispatchToProps)(CommentForm)

export default ConnectedCommentForm 