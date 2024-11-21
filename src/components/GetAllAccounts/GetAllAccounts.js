import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import getAllAccountsService from '../../services/getAllAccountsService'; 
import viewPassbookService from '../../services/viewPassbookService';  
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import './GetAllAccounts.css'; 

const GetAllAccounts = () => {
  const [header, setHeader] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ bankName: '' });
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data with filters:', filters, 'Page size:', pageSize, 'Page:', currentPage);
        
        const filterParams = {};
        if (filters.bankName) {
          filterParams.bankName = filters.bankName;
        }

        const response = await getAllAccountsService({
          page: currentPage,
          limit: pageSize,
          filters: filterParams,  
        });

        if (response.data.length > 0) {
          const updatedResponse = selectTableAttribute(response.data, [
            'accountNumber',
            'bankName',
            'accountBalance',
          ]);
          setHeader(Object.keys(updatedResponse[0]));
          setAccountData(updatedResponse);
          setTotalPages(Math.ceil(Number(response.headers['x-total-count']) / pageSize));
        } else {
          setHeader([]);
          setAccountData([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    fetchData();
  }, [filters, pageSize, currentPage]);  

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);  
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, bankName: value }));
    setCurrentPage(1);  
  };

  // Navigate to ViewPassbook, passing accountNumber via state
  const handleViewPassbook = (accountNumber) => {
    navigate('/user-dashboard/view-passbook', { state: { accountNumber } });  // Pass the accountNumber via state
  };

  return (
    <div className="get-accounts-container">
      <div className="filters">
        <label htmlFor="bankName">Bank Name:</label>
        <input
          type="text"
          id="bankName"
          value={filters.bankName}
          onChange={handleFilterChange}   
          placeholder="Enter bank name"
        />
      </div>

      <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />

      <div className="table-container">
        {accountData.length > 0 ? (
          <Table
            headers={[...header, 'Actions']}
            tableData={accountData.map((account) => ({
              ...account,
              actions: (
                <button
                  onClick={() => handleViewPassbook(account.accountNumber)}  // Trigger navigation
                  className="view-passbook-button"
                >
                  View Passbook
                </button>
              ),
            }))}
          />
        ) : (
          <div className="no-data">No accounts found</div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GetAllAccounts;
