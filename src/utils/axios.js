import axios from 'axios';
// config
import { BASE_URL } from '../config';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({ withCredentials: true,baseURL: BASE_URL ,});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>  
  {
    console.log(error);
    Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
  
);

export default axiosInstance;
