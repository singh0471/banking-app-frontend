import AxiosError from '../utils/errors/axiosError';
import axios from 'axios';

const createUserService = async (userData) => {
  try {
    const token = localStorage.getItem('token');

    
    userData.username = userData.username.trim().toLowerCase();
    userData.email = userData.email.trim().toLowerCase();
    userData.firstName = userData.firstName.trim().toLowerCase();
    userData.lastName = userData.lastName.trim().toLowerCase();

    const response = await axios.post('http://localhost:4000/api/v1/user/createUser', userData, { headers: { auth: token } });
    return response;
  } catch (error) {
    console.error('Error in createUserService:', error);
    throw new AxiosError(error);
  }
};

export default createUserService;
