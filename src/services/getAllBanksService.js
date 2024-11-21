import axios from 'axios';

const getAllBanksService = async ({ page, limit, name, abbreviation }) => {
  const token = localStorage.getItem('token');
  const params = {
    page,
    limit,
    ...(name && { name }),
    ...(abbreviation && { abbreviation }),
  };

  const response = await axios.get('http://localhost:4000/api/v1/bank', {
    headers: { auth: token },
    params,
  });
  console.log("response ",response.data)
  return response;
};

export default getAllBanksService;
