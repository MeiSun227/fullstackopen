
const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return [...state, action.data];
    default:
      return state;
  }
}

  export const initializeUsers = (users) => {
    return async dispatch => {
      dispatch({
        type: 'INIT_USERS',
        data: users
      });
    };
  };

  export default userReducer