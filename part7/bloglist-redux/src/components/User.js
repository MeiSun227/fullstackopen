import React from 'react'

const User = ({ user }) => {
  return (
    <>
      {user.name}
      {user.blogs.length}      
    </>
  )
}

export default User
