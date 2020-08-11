import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  axios.defaults.headers.common['Authorization'] = token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const createBlog = async ( blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const updateBlogLike = async(blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog =async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blog.id}`,config)
  return blog
}

const addComment = async (blog, comment)=>{
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment, config)
  return response.data
  
}
export default { getAll,createBlog,setToken,updateBlogLike,deleteBlog ,addComment}