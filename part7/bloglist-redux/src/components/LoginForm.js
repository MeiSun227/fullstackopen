import React from 'react';
import { connect } from 'react-redux';
import { logInAction } from '../reducers/loginReducer';
import blogService from '../services/blogService';
import TextField from '@material-ui/core/TextField';
import { Container, Button } from '@material-ui/core';
import Notification from './Notification'
import { useformStyles } from '../materialUiStyle/formStyle';

const LoginForm = (props) => {
  const classes = useformStyles()
  const handleLogin = async (event) => {
    event.preventDefault()
    const formContent = { username: event.target.username.value, password: event.target.password.value }
    event.target.reset()
    const user = await props.logInAction(formContent)
    const setUserLocalStorage = user => {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token);
    }

    if (user) {
      setUserLocalStorage(user)
    }
  }

  return (
    <>
            <Container>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div>
                  <TextField id="standard-basic" label="username" name="username" />
                </div>
                <div>
                  <TextField id="standard-basic" label="password" name="password" />
                </div>
                <div><Button className={classes.button} variant="contained" color="primary" type="submit"> login </Button></div>
                <Notification />
              </form>
            </Container>
    </>
  )
}
const mapStateToProps = (state) => {
  return { state }
}
const mapDispatchToProps = { logInAction }


const ConnectedloginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default ConnectedloginForm

