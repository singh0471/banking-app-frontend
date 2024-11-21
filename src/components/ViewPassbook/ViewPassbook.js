import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import viewPassbookService from '../../services/viewPassbookService';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './ViewPassbook.css';

const ViewPassbook = () => {
  const { state } = useLocation();
  const { accountNumber } = state || {};

  const [passbookData, setPassbookData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPassbook = async () => {
      try {
        const response = await viewPassbookService(accountNumber, {
          page: currentPage,
          limit: pageSize,
        });

        if (response.data.length > 0) {
          setPassbookData(response.data);

          
          const totalCount = response.headers['x-total-count'] || 0;  
          setTotalPages(Math.ceil(totalCount / pageSize));
        } else {
          setPassbookData([]);
          setTotalPages(1);  
        }
      } catch (error) {
        console.error('Error fetching passbook:', error);
      }
    };

    fetchPassbook();
  }, [accountNumber, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);  
  };

  const handleBack = () => {
    navigate('/user-dashboard/view-accounts');
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    if (passbookData.length === 0) {
      alert('No passbook data available to download.');
      return;
    }

    const headers = Object.keys(passbookData[0]);
    const rows = passbookData.map((entry) => Object.values(entry));

    doc.autoTable({
      head: [headers],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      margin: { top: 20 },
    });

    doc.save('passbook.pdf');
  };

  const selectedData = passbookData.length
    ? selectTableAttribute(passbookData, [
        'accountNumber',
        'anotherAccountNumber',
        'transactionType',
        'date',
        'amount',
      ])
    : [];
  const headers = selectedData.length > 0 ? Object.keys(selectedData[0]) : [];

  return (
    <div className="view-passbook-container">
      <button onClick={handleBack} className="back-button">
        Back to Accounts
      </button>
      <button onClick={handleDownload} className="download-button">
        Download Passbook
      </button>
      <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
      <div className="table-container">
        {selectedData.length > 0 ? (
          <Table headers={headers} tableData={selectedData} />
        ) : (
          <div className="no-data">No passbook data available</div>
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

export default ViewPassbook;

