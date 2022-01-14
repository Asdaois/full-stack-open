import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API : '/api'

const axiosAPI = axios.create({
  baseURL
})

axiosAPI.defaults.headers.post['Content-Type'] = 'application/json'

axiosAPI.interceptors.request.use(request => {
  const token = window.localStorage.getItem('token')
  request.headers.Authorization = `Bearer ${token}`
  return request
})

export default axiosAPI
