import axios from 'axios'
import endpoint from '../endpoint'

const api = {
  getUsers: () => {
    const url = `${endpoint.user}`
    return axios.get(url)
  },
  getUserById: (data) => {
    const url = `${endpoint.user}/${data.params.id}`
    return axios.get(url)
  },
  addUser: (data) => {
    const url = `${endpoint.user}`
    return axios.post(url, data.requestBody)
  },
  updateUserById: (data) => {
    const url = `${endpoint.user}/${data.params.id}`
    return axios.put(url, data.requestBody)
  },
  deleteUserById: (data) => {
    const url = `${endpoint.user}/${data.params.id}`
    return axios.delete(url)
  },
  upload: (data) => {
    const url = `${endpoint.avatar}`
    return axios.post(url, data.requestBody, { headers: { 'Content-type': 'multipart/form-data' } })
  },
  updateAvatarById: (data) => {
    const url = `${endpoint.avatar}/${data.params.id}`
    return axios.put(url, data.requestBody, { headers: { 'Content-type': 'multipart/form-data' } })
  }
}

export default api
