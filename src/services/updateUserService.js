import axios from 'axios';


const updateUserService = async (userId, parameter,value) => {
  
    try {
      const url = `http://localhost:4000/api/v1/user/${userId}`;
      const updateData = { parameter, value };
      const token = localStorage.getItem('token');
      const response = await axios.put(url, updateData, {headers : {auth:token}});
      return response;
    } catch (error) {
      console.error(`Failed to update ${parameter}:`, error.response?.data || error.message);
      throw new Error(`Update failed for ${parameter}`);
    }
  
};

export default updateUserService;
