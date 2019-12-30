import React from 'react'

const BlogForm = ({
 title,
  author,
  url
}) => {
  return (
    <>
      <div>
        title: <input value={title.value} onChange={title.onChange} />
        <div> author: <input value={author.value} onChange={author.onChange} /></div>
        <div> url: <input value={url.value} onChange={url.onChange} /></div>
      </div>

      <div>
        <button type="submit">create</button>
      </div>
    </>
  )
}


export default BlogForm