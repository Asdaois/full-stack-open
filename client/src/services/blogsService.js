import axiosAPI from './axiosAPI'

const baseURL = '/blogs'

const getAll = async () => {
  const response = await axiosAPI.get(baseURL)
  return response.data
}

export default { getAll }
