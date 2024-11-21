import React, { useState, useEffect } from 'react';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import getKycRequestsService from '../../services/getKycRequestsService';
import approveOrRejectKycRequestService from '../../services/approveOrRejectKycRequestService';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import './KycRequests.css';

const KycRequests = () => {
  const [kycRequests, setKycRequests] = useState([]);
  const [headers, setHeaders] = useState([]);  
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [notes, setNotes] = useState({});  

   
  const fetchKYCRequests = async () => {
    try {
      const response = await getKycRequestsService({
        page: currentPage,
        limit: pageSize,
      });

      if (response.data.length > 0) {
        const filteredData = selectTableAttribute(response.data, ['userId', 'document', 'status']);
        setKycRequests(
          filteredData.map((row) => ({
            ...row,
            document: (
              <a href={row.document} target="_blank" rel="noopener noreferrer">
                {row.document}
              </a>
            ),
            approve: (
              <button
                onClick={() => handleApprove(row.userId)}
                className="approve-button"
              >
                Approve
              </button>
            ),
            reject: (
              <button
                onClick={() => handleReject(row.userId, notes[row.userId])}
                className="reject-button"
                
              >
                Reject
              </button>
            ),
            note: (
              <div className="note-container">
                <input
                  type="text"
                  placeholder="Add rejection note"
                  onChange={(e) => handleNoteChange(row.userId, e.target.value)}
                  className="rejection-input"
                  style={{
                    color: '#000',
                    backgroundColor: '#fff',
                  }}
                />
              </div>
            ),
          }))
        );

        setHeaders([...Object.keys(filteredData[0]), 'approve', 'reject', 'note']);
        const totalCount = response.headers['x-total-count'] || 0;
        setTotalPages(Math.ceil(totalCount / pageSize));
      } else {
        setKycRequests([]);
        setHeaders([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching KYC requests:', error);
    }
  };

  useEffect(() => {
    fetchKYCRequests();
  }, [currentPage, pageSize]);

  // Approve KYC Request
  const handleApprove = async (userId) => {
    try {
      console.log('Approve clicked for userId:', userId);
      await approveOrRejectKycRequestService(userId, 'approved', null);
      alert('KYC Request Approved!');
      fetchKYCRequests(); // Refetch data after approval
    } catch (error) {
      console.error('Error approving KYC request:', error);
    }
  };

  // Reject KYC Request
  const handleReject = async (userId, note) => {
    try {
      console.log('handleReject called for userId:', userId);

      if (!note || !note.trim()) {
        note = 'photo not visible'
        
      }

      console.log('Rejection note:', note);

       
      await approveOrRejectKycRequestService(userId, 'rejected', note);
      alert('KYC Request Rejected!');
      fetchKYCRequests(); 
    } catch (error) {
      console.error('Error rejecting KYC request:', error);
    }
  };

   
  const handleNoteChange = (userId, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [userId]: value,
    }));
  };

  
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);  
  };

  return (
    <div className="admin-kyc-requests-container">
      <h1>Admin KYC Requests</h1>

      <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />

      <div className="table-container">
        {kycRequests.length > 0 ? (
          <Table headers={headers} tableData={kycRequests} />
        ) : (
          <div className="no-data">No KYC requests found</div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default KycRequests;
