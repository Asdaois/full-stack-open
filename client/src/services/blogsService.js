import axiosAPI from './axiosAPI'

const baseURL = '/blogs'

const getAll = async () => {
  const response = await axiosAPI.get(baseURL)
  return response.data
}

const create = async (newBlog) => {
  const response = await axiosAPI.post(baseURL, newBlog)
  return response.data
}
export default { getAll, create }
