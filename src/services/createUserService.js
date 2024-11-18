
import AxiosError from '../utils/errors/axiosError'
import axios from 'axios';
const createUserService = async (userData) => {
  try{
        const token = localStorage.getItem("token");
        const response=  await axios.post('http://localhost:4000/api/v1/user/createUser', userData,{headers : {auth:token}});
        return response;
  }
  catch(error){
    throw new AxiosError(error);
  }
}

export default createUserService