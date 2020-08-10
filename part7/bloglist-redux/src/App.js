import React, { useEffect } from 'react'
import blogService from './services/blogService'
import ConnectedloginForm from './components/LoginForm'
import ConnectedBlogList from './components/BlogsList'
import ConnectedBlogForm from './components/BlogForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser } from './reducers/loginReducer'
import { connect } from 'react-redux'
import userService from './services/userService'
import ConnectedMenu from './components/Menu'
import ConnectedUserList from './components/UsersList'
import ConnectedBlogListDetail from './components/BlogListDetail'
import Blog from './components/Blog'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import Menu from './components/Menu'




const App = (props) => {

  useEffect(() => {
    blogService.getAll().then(blogs => props.initializeBlogs(blogs))
    userService.getAll().then(users => props.initializeUsers(users))
  }, [])

  useEffect(() => {
    let loggedUserJSON
    if (localStorage) {
      loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    }
    if (window.localStorage) {
      loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    }
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  const padding = {
    padding: 5
  }


  if (props.user === null) {
    return (
      <ConnectedloginForm />
    )
  } else {
    return (
      <Router>
        <div>
          <Link style={padding} to="/users"></Link>
          {/* <Link style={padding} to="/blogs"></Link> */}
        </div>
        <ConnectedMenu />
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/users/:id">
            <ConnectedBlogList />
          </Route>
          <Route path="/users">
            <ConnectedUserList />
          </Route>
          <Route path="/blogs">
            <ConnectedBlogListDetail />
          </Route>
          <Route path="/login">
            <ConnectedloginForm/>
          </Route>
          <Route path="/create">
            <ConnectedBlogForm/>
          </Route>
          <Route path="/">
            <Menu/>
          </Route>
        </Switch>
      </Router>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App)