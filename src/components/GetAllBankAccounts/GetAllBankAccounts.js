import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getBankAccountsService from '../../services/getBankAccountsService';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import './GetAllBankAccounts.css';

const GetAllBankAccounts = () => {
  const { state } = useLocation();
  const { bankId } = state || {};

  const [header, setHeader] = useState([]);
  const [allAccountsData, setAllAccountsData] = useState([]);
  const [displayAccountsData, setDisplayAccountsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");  

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAccounts = async () => {
      if (!bankId) {
        console.error('No bankId provided!');
        return;
      }

      try {
        console.log('Fetching accounts for bankId:', bankId);

         
        const response = await getBankAccountsService(bankId);

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
        console.error('Error fetching bank accounts:', error);
      }
    };

    fetchAccounts();
  }, [bankId]);

  useEffect(() => {
    if (allAccountsData.length > 0) {
      
      const filteredData = allAccountsData.filter((account) =>
        Object.values(account).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      
      setTotalPages(Math.ceil(filteredData.length / pageSize));

       
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
    <div className="view-bank-accounts-container">

      <button
        className="back-to-view-banks-button"
        onClick={() => navigate('/admin-dashboard/get-banks')}
      >
        Back to View All Banks
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
          <Table
            headers={[...header]}
            tableData={displayAccountsData}
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

export default GetAllBankAccounts;
