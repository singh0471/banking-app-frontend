import React, { useState, useEffect } from 'react';
import getLedgerService from '../../services/getLedgerService';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
 
import './GetLedger.css';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';

const GetLedger = () => {
  const [header, setHeader] = useState([]);
  const [ledgerData, setLedgerData] = useState([]);
  const [bankId, setBankId] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);

 
  const fetchLedgerData = async () => {
    try {
      const response = await getLedgerService({
        bankId,
        page: currentPage,
        limit: pageSize
      });
      if (response.data.length > 0) {
        const updatedData = selectTableAttribute(response.data, ['bankId','anotherBankId','netBalance'])
        setHeader(Object.keys(updatedData[0]));  
        setLedgerData(updatedData);  
        setTotalPages(
          Math.ceil(Number(response.headers['x-total-count']) / pageSize)
        );
      } else {
        setHeader([]);
        setLedgerData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching ledger data:', error);
    }
  };

  useEffect(() => {
    if (bankId) fetchLedgerData(); 
  }, [bankId, pageSize, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);  
  };

  const handleBankIdChange = (e) => {
    setBankId(e.target.value);
    setCurrentPage(1);  
  };

 

  return (
    <div className="get-ledger-container">
      <div className="bank-id-input">
        <label htmlFor="bankId">Bank ID:</label>
        <input
          type="text"
          id="bankId"
          placeholder="Enter Bank ID"
          value={bankId}
          onChange={handleBankIdChange}
        />
      </div>

      

      <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />

      <div className="table-container">
        {ledgerData.length > 0 ? (
          <Table headers={header} tableData={ledgerData} />
        ) : (
          <div className="no-data">No ledger data found</div>
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

export default GetLedger;
