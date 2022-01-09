import axiosAPI from 'api/axiosAPI';

const baseURL = '/notes';

const getAll = async () => {
  const response = await axiosAPI.get(baseURL);
  return response.data;
};

const create = async (newObject) => {
  const response = await axiosAPI.post(baseURL, newObject);

  return response.data;
};

const update = async (id, newObject) => {
  try {
    const response = await axiosAPI.put(`${baseURL}/${id}`, newObject);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

const notesAPI = {
  getAll,
  update,
  create,
};

export default notesAPI;
