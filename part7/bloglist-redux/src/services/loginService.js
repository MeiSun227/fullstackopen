import axios from 'axios'
const baseUrl = ' http://localhost:3003/api/login'

const login = async (formContent) => {
  const response = await axios.post(baseUrl, formContent)
  return response.data

}

export default { login }