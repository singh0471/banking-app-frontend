import React, { useState, useEffect } from 'react';
import getAllUsersService from '../../services/getAllUsersService';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import Filter from '../../SharedComponents/Filter/Filter';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
const GetAllUsers = () => {
  const [header, setHeader] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log('Fetching data with:', { filters, pageSize, currentPage });
    const fetchData = async () => {
      try {
        const response = await getAllUsersService({
          page: currentPage,
          limit: pageSize,
          ...filters,
        });
        console.log(response);
        if (response.data.length > 0) {
            const updatedRespond = selectTableAttribute(response.data,['id','username','email','firstName','lastName','dateOfBirth','totalBalance']);
          setHeader(Object.keys(updatedRespond[0]));  
          setUserData(updatedRespond);  
          console.log(updatedRespond);
          setTotalPages(Math.ceil(Number(response.headers['x-total-count']) / pageSize));  
        } else {
          setHeader([]);
          setUserData([]);
          setTotalPages(1);  
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [filters, pageSize, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);  
  };

  const handleFilterChange = (attribute, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [attribute]: value }));
    setCurrentPage(1);  
  };

  return (
    <div className="get-users-container">
      <div className="filters">
        <Filter
          label="Username"
          attribute="username"
          value={filters.username || ''}
          onFilterChange={handleFilterChange}
        />
        <Filter
          label="First Name"
          attribute="firstName"
          value={filters.firstName || ''}
          onFilterChange={handleFilterChange}
        />
        <Filter
          label="Last Name"
          attribute="lastName"
          value={filters.lastName || ''}
          onFilterChange={handleFilterChange}
        />
      </div>
      <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
      <div className="table-container">
        {userData.length > 0 ? (
          <Table headers={header} tableData={userData} />
        ) : (
          <div className="no-data">No users found</div>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default GetAllUsers;
