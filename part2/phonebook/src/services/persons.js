import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (personsObject) => {
  return axios.post(baseUrl, personsObject)
}



export default { 
  getAll: getAll, 
  create: create
}