import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'

const Blog = (props) => {
  return (
    <p>  {props.blog.author} {props.blog.title} {props.blog.id} {props.blog.url}</p>
  )
}
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])

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

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
      </form>
    )
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in </p>
        <input type="button"
            value="logout"
            onClick={() => handleLogout()} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      
      </div>
    )
  }
}

export default App;
