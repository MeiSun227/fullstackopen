import loginService from '../services/loginService';

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data
    case 'LOG_OUT':
      return action.data
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}
export const initializeUser = () => {
  return async dispatch => {
    const response = await loginService.getAll();
    dispatch({
      type: 'INIT_user',
      data: response
    });
  };
}

export const logInAction = (data) => {
  return async dispatch => {
    try {

      const user = await loginService.login(data)
      dispatch({
        type: 'LOG_IN',
        data: user
      })
      return user
    } catch (err) {
      dispatch({
        type: 'LOGIN_ERR',
        data: 'Invalid Username or Password'
      })
      setTimeout(() => dispatch({
        type: "REMOVE_NOTIFICATION",
      }), 3000);
    }
  }
}

export const logOutAction = () => {
  return async dispatch => {
    dispatch({
      type: 'LOG_OUT',
      data: null
    })
  }
}
export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    });
  };
};

export default loginReducer