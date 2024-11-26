import React, { useState, useEffect } from 'react';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import getKycRequestsService from '../../services/getKycRequestsService';
import approveOrRejectKycRequestService from '../../services/approveOrRejectKycRequestService';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        console.log("KYC Data:", response.data); // Log the response for debugging

        const filteredData = response.data.map((row) => ({
          userId: row.userId,
          status: row.status,
          aadhar: (
            <button
              className="view-document-button"
              onClick={() => handleViewDocument(row.aadhar, 'Aadhar')}
            >
              View Aadhar
            </button>
          ),
          pan: (
            <button
              className="view-document-button"
              onClick={() => handleViewDocument(row.pan, 'PAN')}
            >
              View PAN
            </button>
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
              />
            </div>
          ),
        }));

        setKycRequests(filteredData);

        setHeaders(['userId', 'status', 'aadhar', 'pan', 'approve', 'reject', 'note']);
        const totalCount = response.headers['x-total-count'] || 0;
        setTotalPages(Math.ceil(totalCount / pageSize));
      } else {
        setKycRequests([]);
        setHeaders([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching KYC requests:', error);
      toast.error('Error fetching KYC requests. Please try again later.');
    }
  };

  useEffect(() => {
    fetchKYCRequests();
  }, [currentPage, pageSize]);

  const handleViewDocument = (url, type) => {
    if (url) {
      console.log(`Opening ${type} URL:`, url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast.error(`${type} document URL is missing.`);
    }
  };

  const handleApprove = async (userId) => {
    try {
      console.log('Approve clicked for userId:', userId);
      await approveOrRejectKycRequestService(userId, 'approved', null);
      toast.success('KYC Request Approved!');
      fetchKYCRequests();
    } catch (error) {
      console.error('Error approving KYC request:', error);
      toast.error('Failed to approve KYC request. Please try again.');
    }
  };

  const handleReject = async (userId, note) => {
    try {
      console.log('handleReject called for userId:', userId);

      if (!note || !note.trim()) {
        note = 'photo not visible';
      }

      console.log('Rejection note:', note);

      await approveOrRejectKycRequestService(userId, 'rejected', note);
      toast.success('KYC Request Rejected!');
      fetchKYCRequests();
    } catch (error) {
      console.error('Error rejecting KYC request:', error);
      toast.error('Failed to reject KYC request. Please try again.');
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
      <ToastContainer />
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
