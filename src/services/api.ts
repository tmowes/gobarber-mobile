import axios from 'axios'

const api = axios.create({
  baseURL: 'https://nodedeploy.tmowes.dev',
})

export default api
