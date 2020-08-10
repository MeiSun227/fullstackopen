import blogService from '../services/blogService'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      state = state.sort(((a, b) => b.likes - a.likes))
      return [...state]
    case 'DELETE_BLOG':
      state = state.filter(blog => (blog.id !== action.data.id))
      return [...state]
    case 'CREATE_COMMENT':
      return state.map(blog => blog.id === action.data.id)
    default:
      return state;
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: response
    });
  };
};

export const createBlogAction = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blogObject)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const likeBlogAction = (blog) => {
  return async dispatch => {
    blog.likes += 1
    const updateBlog = await blogService.updateBlogLike(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updateBlog
    })
  }
}

export const deleteBlogAction = (blog) => {
  return async dispatch => {
    const deleteBlog = await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: deleteBlog
    })
  }
}

export const createBlogComment = (comment) => {
  return async dispatch => {
    const commentBlog = await blogService.addComment(comment)
    dispatch({
      type: 'CREATE_COMMENT',
      data: commentBlog
    })
  }
}

export default blogReducer