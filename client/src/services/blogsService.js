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

const update = async (updateBlog) => {
  const response = await axiosAPI.put(`${baseURL}/${updateBlog.id}`, updateBlog)
  return response.data
}

const remove = async (id) => {
  const response = await axiosAPI.delete(`${baseURL}/${id}`)
  return response.data
}

export default { create, getAll, update, remove }
