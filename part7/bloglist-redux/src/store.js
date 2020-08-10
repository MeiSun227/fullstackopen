import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import loginReducer from './reducers/loginReducer';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from'./reducers/userReducer';


const reducer = combineReducers({
    user: loginReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk))
export default store;