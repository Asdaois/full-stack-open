import axiosAPI from './axiosAPI'

const baseURL = '/login'

const create = async newObject => {
  const response = await axiosAPI.post(baseURL, newObject)
  return response.data
}

const login = async credentials => {
  const response = await axiosAPI.post(baseURL, credentials)

  window.localStorage.setItem('token', response.data.token)

  return response.data
}

export default { login, create }
