import React, { useState, useImperativeHandle } from "react"

const TogglableBlogDetail = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: ' solid ',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p onClick={toggleVisibility}>
          {props.title}
        </p>
      </div>
      <div style={showWhenVisible}>
        <p onClick={toggleVisibility}>
          {props.title}
        </p>
        {props.children}
      </div>
    </div>
  )
})

export default TogglableBlogDetail