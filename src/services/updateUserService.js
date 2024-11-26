import axios from 'axios';

const updateUserService = async (userId, updates) => {
  try {
    const url = `http://localhost:4000/api/v1/user/${userId}`;
    const token = localStorage.getItem('token');
    
     
    const response = await axios.put(
      url,
      updates, 
      {
        headers: { auth: token },  
      }
    );
    
    return response;
  } catch (error) {
    console.error(`Failed to update user:`, error.response?.data || error.message);
    throw new Error(`Update failed: ${error.response?.data?.message || error.message}`);
  }
};

export default updateUserService;
