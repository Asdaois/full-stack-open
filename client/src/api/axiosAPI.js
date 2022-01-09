import axios from 'axios';

const baseURL = process.env.REACT_APP_API; 

const axiosAPI = axios.create({ baseURL});
axiosAPI.defaults.headers.post["Content-Type"] = "application/json";
console.log(baseURL);
export default axiosAPI;
