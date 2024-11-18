import axios from 'axios';
import AxiosError from '../utils/errors/axiosError';

const deleteUserService = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`http://localhost:4000/api/v1/user/${userId}`,{headers : {auth:token}});
    return response;
  } catch (error) {
    throw new AxiosError(error)  
  }
};

export default deleteUserService;