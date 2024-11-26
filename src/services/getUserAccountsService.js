import axios from "axios";

const getUserAccountsService = async (userId) => {
  const token = localStorage.getItem('token');
  console.log("get all bank accounts service called");
  console.log("Token:", token);
 

  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/user/${userId}?include=accounts`,
      {
        headers: { auth: token }  
      }
    );

    console.log("Response:", response.data.accounts);
    return response;

  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    throw error;  
  }
};

export default getUserAccountsService;
