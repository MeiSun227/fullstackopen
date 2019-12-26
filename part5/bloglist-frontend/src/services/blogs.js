import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  axios.defaults.headers.common['Authorization'] = token;
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const deleteBlog = async (id) =>{
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newBlog, config)
  return request.then(response => response.data)
}

export default { getAll, createBlog, update, setToken, deleteBlog }

