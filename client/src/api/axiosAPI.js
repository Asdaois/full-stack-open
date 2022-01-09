import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API : '/api'; 

const axiosAPI = axios.create({ baseURL});
axiosAPI.defaults.headers.post["Content-Type"] = "application/json";

export default axiosAPI;
