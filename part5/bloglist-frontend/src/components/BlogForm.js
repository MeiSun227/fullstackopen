import React from 'react'


const BlogForm = ({
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <>
      <div>
        title: <input value={newTitle} onChange={handleTitleChange} />
        <div> author: <input value={newAuthor} onChange={handleAuthorChange} /></div>
        <div> url: <input value={newUrl} onChange={handleUrlChange} /></div>
      </div>

      <div>
        <button type="submit">create</button>
      </div>
    </>
  )
}


export default BlogForm