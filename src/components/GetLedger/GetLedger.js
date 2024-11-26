import React, { useState, useEffect } from 'react';
import getLedgerService from '../../services/getLedgerService';
import getAllBanksService from '../../services/getAllBanksService'; // Import the service to get all banks
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import './GetLedger.css';

const GetLedger = () => {
  const [header, setHeader] = useState([]);
  const [ledgerData, setLedgerData] = useState([]);
  const [bankId, setBankId] = useState('');
  const [banks, setBanks] = useState([]); // State to hold all banks data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all banks for the dropdown
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getAllBanksService({
          page: 1,
          limit: 100 // Assuming there won't be more than 100 banks
        });
        if (response.data.length > 0) {
          setBanks(response.data);
        }
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };
    fetchBanks();
  }, []);

  // Fetch ledger data
  const fetchLedgerData = async () => {
    try {
      const response = await getLedgerService({
        bankId,
        page: currentPage,
        limit: pageSize
      });
      if (response.data.length > 0) {
        const updatedData = selectTableAttribute(response.data, ['bankName', 'anotherBankName', 'netBalance']);
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
      <div className="bank-id-select">
        <label htmlFor="bankId">Select Bank:</label>
        <select
          id="bankId"
          value={bankId}
          onChange={handleBankIdChange}
          className="bank-select"
        >
          <option value="">-- Select Bank --</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.id} - {bank.abbreviation}
            </option>
          ))}
        </select>
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

