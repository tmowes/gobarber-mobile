import axios from 'axios'

const api = axios.create({
  baseURL: 'http://nodedeploy.tmowes.dev',
})

export default api
