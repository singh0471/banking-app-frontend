import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getBankAccountsService from '../../services/getBankAccountsService';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import './GetAllUserAccounts.css';
import getUserAccountsService from '../../services/getUserAccountsService';

const GetAllUserAccounts = () => {
  const { state } = useLocation();
  const { userId } = state || {};

  const [header, setHeader] = useState([]);
  const [allAccountsData, setAllAccountsData] = useState([]);
  const [displayAccountsData, setDisplayAccountsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAccounts = async () => {
      if (!userId) {
        console.error('No userId provided!');
        return;
      }

      try {
        console.log('Fetching accounts for userId:', userId);

        // Call the service to get user accounts (replace the service with the correct one if needed)
        const response = await getUserAccountsService(userId);

        if (response.data.accounts && response.data.accounts.length > 0) {
          const updatedResponse = selectTableAttribute(response.data.accounts, [
            'accountNumber',
            'accountBalance',
            'userId',
            'bankName',
          ]);

          setAllAccountsData(updatedResponse);
          setTotalPages(Math.ceil(updatedResponse.length / pageSize));
          setDisplayAccountsData(updatedResponse.slice(0, pageSize));
          setHeader(Object.keys(updatedResponse[0]));
        } else {
          setHeader([]);
          setAllAccountsData([]);
          setDisplayAccountsData([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching user accounts:', error);
      }
    };

    fetchAccounts();
  }, [userId]);

  useEffect(() => {
    if (allAccountsData.length > 0) {
      // Filter based on the search query
      const filteredData = allAccountsData.filter((account) =>
        Object.values(account).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      // Calculate total pages for filtered data
      setTotalPages(Math.ceil(filteredData.length / pageSize));

      // Set data to be displayed for the current page
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setDisplayAccountsData(filteredData.slice(startIndex, endIndex));
    }
  }, [currentPage, pageSize, allAccountsData, searchQuery]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="view-user-accounts-container">

      <button
        className="back-to-view-users-button"
        onClick={() => navigate('/admin-dashboard/get-users')}
      >
        Back to View All Users
      </button>
      <div className="search-container">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search accounts..."
        />
      </div>

      <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />

      <div className="table-container">
        {displayAccountsData.length > 0 ? (
          <Table headers={[...header]} tableData={displayAccountsData} />
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

export default GetAllUserAccounts;
