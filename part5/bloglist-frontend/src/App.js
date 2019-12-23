import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import './index.css'

const Blog = (props) => {
  return (
    <p>{props.blog.title} {props.blog.author}</p>
  )
}
const BlogForm = (props) => {
  return (
    <>
      <div>
        title: <input value={props.newTitle} onChange={props.handleTitleChange} />
        <div> author: <input value={props.newAuthor} onChange={props.handleAuthorChange} /></div>
        <div> url: <input value={props.newUrl} onChange={props.handleUrlChange} /></div>
      </div>

      <div>
        <button type="submit">create</button>
      </div>
    </>
  )
}

const Blogs = (props) => {
  if ((props) && (props.blogs !== null)) {
    const blog_components = props.blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
    return (
      <>
        {blog_components}
      </>
    )
  } else {
    return (<></>)
  }
}

const Notification =({message}) => {
  if (message === null) {
    return null
  }
  
  return (
    <div class="add">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div class="error">
      {message}
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  

  useEffect(() => {
    blogsService
      .getAll().then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage("wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = { title: newTitle, author: newAuthor, url: newUrl }
    blogsService
      .createBlog(blogObject)
      .then(createdBlog => {
        blogsService
          .getAll()
          .then(response => {
            setBlogs(response)
            setMessage( " a new blog " + blogObject.title + " by "+ blogObject.author + " added " )
          })
      })
    setTimeout(() => {
      setMessage(null)
      setErrorMessage(null)
    }, 2000)
  }


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div> Username
      <input type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div> Password
      <input type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />

        </div>
        <button type="submit">login</button>
        <ErrorNotification message={errorMessage}/>
      </form>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in </p>
        <input type="button"
          value="logout"
          onClick={() => handleLogout()} />
        <h2>create new blog</h2>
        <form onSubmit={createBlog}>
        <Notification message={message} />
          <BlogForm handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} newtitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} />
        </form>
        <Blogs blogs={blogs}/>
      </div>
    )
  }
}
export default App;