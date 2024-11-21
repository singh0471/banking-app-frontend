import axios from "axios";
import { jwtDecode } from "jwt-decode";


const getAllAccountsService = async ({ page, limit, filters = {} }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token not found");
    }

   
    const userId = jwtDecode(token.split(" ")[1]).userId;

    console.log(userId);

   
    const response = await axios.get(
      `http://localhost:4000/api/v1/user/${userId}/account`,
      {
        params: {
          page,
          limit,
          ...filters,  
        },
        headers: {
          auth: token,  
        },
      }
    );

    return response;
  } catch (error) {
   
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export default getAllAccountsService;

