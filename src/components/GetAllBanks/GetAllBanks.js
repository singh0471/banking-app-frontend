import React, { useState, useEffect } from 'react';
import getAllBanksService from '../../services/getAllBanksService';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import Filter from '../../SharedComponents/Filter/Filter';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';

const GetAllBanks = () => {
  const [header, setHeader] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log('Fetching data with:', { filters, pageSize, currentPage });
    const fetchData = async () => {
      try {
        const response = await getAllBanksService({
          page: currentPage,
          limit: pageSize,
          ...filters,
        });
        console.log(response);
        if (response.data.length > 0) {
          const updatedRespond = selectTableAttribute(response.data, [
            'id',
            'name',
            'abbreviation'
          ]);
          setHeader(Object.keys(updatedRespond[0])); 
          setBankData(updatedRespond); 
          console.log(updatedRespond);
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

    fetchData();
  }, [filters, pageSize, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChange = (attribute, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [attribute]: value }));
    setCurrentPage(1); // Reset to first page
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
