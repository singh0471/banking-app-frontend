import axios from 'axios';

const getLedgerService = async ({ bankId, page, limit }) => {
  const token = localStorage.getItem('token');
  const params = {
    page,
    limit
    
  };

  const response = await axios.get(
    `http://localhost:4000/api/v1/bank/${bankId}/ledger`,
    {
      headers: { auth: token },
      params,
    }
  );

  return response;
};

export default getLedgerService;

