import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogsService from './services/blogs'
import './index.css'



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
            setMessage(" a new blog " + blogObject.title + " by " + blogObject.author + " added ")
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

  const handleLikeChange = (blog, event) => {
    event.preventDefault()
    blog.likes += 1
    blogsService
      .update(blog.id, blog)
      .then(response => {
        blogsService
          .getAll()
          .then(response => {
            setBlogs(response)
          })
      })
  }

  const handleDeleteBlog = (blogToDelete ,event) => {
    event.preventDefault()
    if (window.confirm("Remove blog " + blogToDelete.title + " by " + blogToDelete.author)) {
      blogsService.deleteBlog(blogToDelete.id)
        .then(response => {
          blogsService
            .getAll()
            .then(response => {
              setBlogs(response)
            })
        })
    }
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
        <ErrorNotification message={errorMessage} />
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
        <Togglable buttonLabel="new blog">
          <form onSubmit={createBlog}>
            <Notification message={message} />
            <BlogForm handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} newtitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} />
          </form>
        </Togglable>
        <Blogs key={blogs.title} blogs={blogs} handleLikeChange={handleLikeChange} handleDeleteBlog={handleDeleteBlog} />
      </div>
    )
  }
}
export default App;