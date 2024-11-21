import axios, { AxiosError } from 'axios';

const getKycRequestsService = async ({ page, limit }) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await axios.get('http://localhost:4000/api/v1/kyc-request', {
      headers: { auth: token },
      params: { page, limit },  
    });
    console.log(response)
    return response;
  } catch (error) {
    console.error('Error fetching KYC requests:', error);
    throw new AxiosError(error.message, error.config, error.code, error.request, error.response);  
  }
};

export default getKycRequestsService;

