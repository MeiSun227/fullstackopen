import React from 'react'
import { useHistory } from "react-router-dom"
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  const handleReset = () => {
    content.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            {...content} />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
            reset={author.reset} />
        </div>
        <div>
          url for more info
          <input 
           {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={()=>handleReset()} >Reset</button>
      </form>
    </div>
  )

}

export default CreateNew;