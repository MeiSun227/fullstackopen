
const notificationReducer = (state = { message: '' }, action) => {
  if (action.type === 'LOG_IN_NOTIFICATION') {
    return { ...state, message: action.data }
  }
  if (action.type === 'LOGIN_ERR') {
    return { ...state, message: action.data, type: action.type}
  }
  if (action.type === 'REMOVE_NOTIFICATION') {
    return { ...state, message: action.data, type: action.type }
  }
  return state
}

export default notificationReducer