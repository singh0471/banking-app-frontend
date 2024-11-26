import axios from "axios";

const getBankAccountsService = async (bankId) => {
  const token = localStorage.getItem('token');
  console.log("get all bank accounts service called");
  console.log("Token:", token);
 

  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/bank/${bankId}?include=accounts`,
      {
        headers: { auth: token } // Prefer 'Authorization: Bearer' for tokens
      }
    );

    console.log("Response:", response.data.accounts);
    return response;

  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    throw error; // Re-throw for caller to handle it as needed
  }
};

export default getBankAccountsService;
