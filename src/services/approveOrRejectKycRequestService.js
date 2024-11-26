import axios, { AxiosError } from 'axios';


const approveOrRejectKycRequestService = async (userId,status,note) => {
  try {
    const token = localStorage.getItem('token');
    console.log(status, " ", note)
    
    const response = await axios.put(`http://localhost:4000/api/v1/kyc-request`,{userId:userId,status:status,adminNote:note}, {
      headers: { auth: token },  
    });

    return response;
  } catch (error) {
    console.error('Error fetching KYC:', error);
    throw new AxiosError(error);  
  }
};

export default approveOrRejectKycRequestService;
