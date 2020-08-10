import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import { logOutAction } from '../reducers/loginReducer'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import { useNavStyles } from '../materialUiStyle/menu'
const Menu = (props) => {
  const handleLogOut = () => {
    window.localStorage.clear()
    props.logOutAction()
  }
  const classes = useNavStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Button color="inherit" component={Link}to="/blogs">Blogs</Button>      
            <Button color="inherit" component={Link} to="/users">Users</Button>
          <Typography> {props.user.username} is logged in. </Typography>
          <Button color="inherit" onClick={handleLogOut}> logout </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = { logOutAction }

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default ConnectedMenu