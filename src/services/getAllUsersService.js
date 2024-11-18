import axios, { AxiosError } from 'axios';

const getAllUsersService = async (params) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:4000/api/v1/user/getAll`, {
      headers: { auth: token },
      params: params, // Pass the pagination and filter parameters here
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new AxiosError(error);
  }
};

export default getAllUsersService;
