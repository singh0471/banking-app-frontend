import axios from 'axios';
import AxiosError from '../utils/errors/axiosError';

const deleteBankService = async (bankId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`http://localhost:4000/api/v1/bank/${bankId}`,{headers : {auth:token}});
    return response;
  } catch (error) {
    throw new AxiosError(error)  
  }
};

export default deleteBankService;
