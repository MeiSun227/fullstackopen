import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import { usetableStyles } from '../materialUiStyle/tableStyle';
import{useStyles} from'../materialUiStyle/buttonStyle';
import { Button } from '@material-ui/core';

const BlogsList = (props) => {
  const classes = usetableStyles()
  const buttonClass = useStyles()

  return (

    <>
      <h2>Blogs</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Blog Name </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.blogs.map(blog =>
              (<TableRow key={blog.id}>
                <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={buttonClass.root}><Button variant="contained" color="primary"><Link to="/create">create blog</Link></Button></div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const ConnectedBlogListDetail = connect(mapStateToProps, null)(BlogsList)
export default ConnectedBlogListDetail  