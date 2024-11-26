import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAllBanksService from '../../services/getAllBanksService';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import Filter from '../../SharedComponents/Filter/Filter';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import './GetAllBanks.css';

const GetAllBanks = () => {
  const [header, setHeader] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getAllBanksService({
          page: currentPage,
          limit: pageSize,
          ...filters,
        });

        if (response.data.length > 0) {
          const updatedResponse = selectTableAttribute(response.data, [
            'id',
            'name',
            'abbreviation',
          ]);

          // Add "View Accounts" button column dynamically
          const updatedWithAccounts = updatedResponse.map((bank) => ({
            ...bank,
            viewAccounts: (
              <button
                className="view-accounts-button"
                onClick={() =>
                  navigate('/admin-dashboard/get-bank-accounts', {
                    state: { bankId: bank.id, accounts: bank.accounts },
                  })
                }
              >
                View Accounts
              </button>
            ),
          }));

          setHeader([...Object.keys(updatedResponse[0]), 'viewAccounts']);
          setBankData(updatedWithAccounts);
          setTotalPages(
            Math.ceil(Number(response.headers['x-total-count']) / pageSize)
          );
        } else {
          setHeader([]);
          setBankData([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching bank data:', error);
      }
    };

    fetchBanks();
  }, [filters, pageSize, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChange = (attribute, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [attribute]: value }));
    setCurrentPage(1); // Reset to first page whenever a filter is applied
  };

  return (
    <div className="get-banks-container">
       
      <div className="filters">
        <Filter
          label="Bank Name"
          attribute="name"
          value={filters.name || ''}
          onFilterChange={handleFilterChange}
        />
        <Filter
          label="Abbreviation"
          attribute="abbreviation"
          value={filters.abbreviation || ''}
          onFilterChange={handleFilterChange}
        />
      </div>

      <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />

      <div className="table-container">
        {bankData.length > 0 ? (
          <Table headers={header} tableData={bankData} />
        ) : (
          <div className="no-data">No banks found</div>
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

export default GetAllBanks;
