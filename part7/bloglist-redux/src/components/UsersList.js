import React from 'react'
import User from './User';
import { connect } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import { TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { Link } from "react-router-dom"
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import { usetableStyles } from '../materialUiStyle/tableStyle';

const UsersList = (props) => {
  const classes = usetableStyles()
  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> User Name </TableCell>
              <TableCell>Blogs Create</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {props.users[0].map((user) => (<TableRow key={user.id}>
              <TableCell> <Link to={`/users/${user.id}`}><User key={user.id} user={user} /></Link></TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ConnectedUserList = connect(mapStateToProps, null)(UsersList)
export default ConnectedUserList

