import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getKycService from '../../services/getKycService';
import submitKycService from '../../services/submitKycService';
import photoUrlService from '../../utils/helper/photoUrlService';
import './KYC.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const KYC = () => {
  const [kycData, setKycData] = useState(null);
  const [aadharPhoto, setAadharPhoto] = useState(null);
  const [panPhoto, setPanPhoto] = useState(null);
  const [status, setStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKYC = async () => {
      try {
        const response = await getKycService();
        setKycData(response.data);
        setStatus(response.data.status);
        setAdminNote(response.data.adminNote || '');
      } catch (error) {
        console.error("Error fetching KYC:", error);
        toast.error('Could not fetch KYC requests');
      }
    };

    fetchKYC();
  }, []);

  const handleFileChange = (e, type) => {
    if (type === 'aadhar') {
      setAadharPhoto(e.target.files[0]);
    } else if (type === 'pan') {
      setPanPhoto(e.target.files[0]);
    }
  };

  const handleUploadDocuments = async (e) => {
    e.preventDefault();

    if (!aadharPhoto || !panPhoto) {
      toast.error('Both Aadhar and PAN documents must be uploaded');
      return;
    }

    try {
      const aadharUrl = await photoUrlService(aadharPhoto);
      const panUrl = await photoUrlService(panPhoto);

      await submitKycService(aadharUrl, panUrl);
      toast.success("KYC documents uploaded successfully!");

      const freshKycData = await getKycService();
      setKycData(freshKycData.data);
      setStatus(freshKycData.data.status);
      setAdminNote(freshKycData.data.adminNote || '');
    } catch (error) {
      console.error("Error uploading KYC documents:", error);
      toast.error("Failed to upload the documents. Please try again.");
    }
  };

  const handleBack = () => {
    navigate('/user-dashboard');  
  };

  const getButtonText = () => {
    // return status === 'not submitted' ? 'Upload Documents' : 'Update Documents';

    if(status==='not submitted')
      return 'Upload Documents';
    else if(status==='rejected')
      return 'Upload Your Documents Again'
    else 
      return 'Update Documents'


  };

  const handleViewDocument = (type) => {
    if (type === 'aadhar' && kycData?.aadhar) {
      window.open(kycData.aadhar, '_blank');
    } else if (type === 'pan' && kycData?.pan) {
      window.open(kycData.pan, '_blank');
    } else {
      toast.error(`${type === 'aadhar' ? 'Aadhar' : 'PAN'} document URL is missing.`);
    }
  };

  return (
    <div className="kyc-container">
      <ToastContainer />
      <button onClick={handleBack} className="back-button">Back to Dashboard</button>

      <div className="kyc-content">
        <h2>User KYC</h2>

        <div className="kyc-status">
          <table className="kyc-table">
            <thead>
              <tr>
                {status && <th>Status</th>}
                {adminNote && <th>Note</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                {status && <td>{status}</td>}
                {adminNote && <td>{adminNote}</td>}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="upload-section">
          <button className="upload-button" onClick={() => setShowUploadModal(true)}>
            {getButtonText()}
          </button>
          {(status === 'submitted' || status === 'approved' || status === 'rejected') && (
            <button className="view-button" onClick={() => setShowViewModal(true)}>
              View Documents
            </button>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowUploadModal(false)}>&times;</span>
            <h3>{getButtonText()}</h3>
            <form onSubmit={handleUploadDocuments}>
              <div>
                <label htmlFor="aadhar">Upload Aadhar Card:</label>
                <input 
                  type="file" 
                  id="aadhar" 
                  onChange={(e) => handleFileChange(e, 'aadhar')} 
                  accept="image/*" 
                  required
                />
              </div>
              <div>
                <label htmlFor="pan">Upload PAN Card:</label>
                <input 
                  type="file" 
                  id="pan" 
                  onChange={(e) => handleFileChange(e, 'pan')} 
                  accept="image/*" 
                  required
                />
              </div>
              <button type="submit" className="upload-button">{getButtonText()}</button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowViewModal(false)}>&times;</span>
            <h3>View Documents</h3>
            <button className="view-modal-button" onClick={() => handleViewDocument('aadhar')}>
              View Aadhar Document
            </button>
            <button className="view-modal-button" onClick={() => handleViewDocument('pan')}>
              View PAN Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYC;
