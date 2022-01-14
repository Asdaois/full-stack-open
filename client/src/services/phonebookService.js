import axiosAPI from 'services/axiosAPI'

const baseURL = 'phonebook/persons'

const getALl = async () => {
  const response = await axiosAPI.get(baseURL)
  return response.data
}

const create = async (newPerson) => {
  const response = await axiosAPI.post(baseURL, newPerson)
  return response.data
}

const deleteOne = async (id) => {
  const response = await axiosAPI.delete(`${baseURL}/${id}`)
  return response.data
}

const update = async (personChanged) => {
  console.log(personChanged)
  const response = await axiosAPI.put(
    `${baseURL}/${personChanged.id}`,
    personChanged
  )

  return response.data
}
const phonebookAPI = { create, getALl, deleteOne, update }

export default phonebookAPI
