

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import getKycService from '../../services/getKycService';
// import submitKycService from '../../services/submitKycService';
// import photoUrlService from '../../utils/helper/photoUrlService';
// import './KYC.css';

// const KYC = () => {
//   const [kycData, setKycData] = useState(null);
//   const [photo, setPhoto] = useState(null);
//   const [documentUrl, setDocumentUrl] = useState(null);
//   const [status, setStatus] = useState('');
//   const [adminNote, setAdminNote] = useState('');
 
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchKYC = async () => {
//       try {
//         const response = await getKycService();
//         setKycData(response.data);
//         setStatus(response.data.status);
//         setAdminNote(response.data.adminNote || '');
//         setDocumentUrl(response.data.documentUrl);
//       } catch (error) {
//         console.error("Error fetching KYC:", error);
//       }
//     };

//     fetchKYC();
//   }, []);

//   const handleFileChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!photo) {
//       alert("Please upload a photo document");
//       return;
//     }

//     try {
//       const photoUrl = await photoUrlService(photo);   
//       setDocumentUrl(photoUrl);

//       const updatedKycData = await submitKycService({ document: photoUrl }); 
//       setKycData(updatedKycData.data);   
//       alert("KYC document uploaded successfully!");

//       // Fetch the updated KYC data after upload
//       const freshKycData = await getKycService();
//       setKycData(freshKycData.data);  // Update the state with fresh KYC data
//       setStatus(freshKycData.data.status);  // Update the status
//       setAdminNote(freshKycData.data.adminNote || '');  // Update admin note
//     } catch (error) {
//       console.error("Error uploading KYC document:", error);
//       alert("Failed to upload the document. Please try again.");
//     }
//   };

//   const handleBack = () => {
//     navigate('/user-dashboard');  
//   };

//   return (
//     <div className="kyc-container">
//       <button onClick={handleBack} className="back-button">Back to Dashboard</button>

//       {(
//         <div className="kyc-content">
//           <h2>User KYC</h2>
          
//           {/* KYC Status and Admin Note */}
//           <div className="kyc-status">
//             <table className="kyc-table">
//               <thead>
//                 <tr>
//                   {status && <th>Status</th>}  {/* Conditionally render Status column */}
//                   {adminNote && <th>Note</th>}  {/* Conditionally render Note column */}
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   {status && <td>{status}</td>}  {/* Only render Status data if it's available */}
//                   {adminNote && <td>{adminNote}</td>} {/* Only render Note data if it's available */}
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {documentUrl && (
//             <div className="kyc-document">
//               <h4>Uploaded Document:</h4>
//               <img src={documentUrl} alt="KYC Document" className="kyc-image" />
//             </div>
//           )}

//           {/* Upload Section */}
//           <div className="upload-section">
//             <h4>Upload KYC Document</h4>
//             <form onSubmit={handleSubmit}>
//               <input 
//                 type="file" 
//                 onChange={handleFileChange} 
//                 accept="image/*" 
//                 required 
//               />
//               <button type="submit" className="upload-button">Upload Document</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KYC;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getKycService from '../../services/getKycService';
import submitKycService from '../../services/submitKycService';
import photoUrlService from '../../utils/helper/photoUrlService';
import './KYC.css';

const KYC = () => {
  const [kycData, setKycData] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [status, setStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKYC = async () => {
      try {
        const response = await getKycService();
        setKycData(response.data);
        setStatus(response.data.status);
        setAdminNote(response.data.adminNote || '');
        setDocumentUrl(response.data.documentUrl);
      } catch (error) {
        console.error("Error fetching KYC:", error);
      }
    };

    fetchKYC();
  }, []);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please upload a photo document");
      return;
    }

    try {
      const photoUrl = await photoUrlService(photo);   
      setDocumentUrl(photoUrl);

      const updatedKycData = await submitKycService({ document: photoUrl }); 
      setKycData(updatedKycData.data);   
      alert("KYC document uploaded successfully!");

       
      const freshKycData = await getKycService();
      setKycData(freshKycData.data);   
      setStatus(freshKycData.data.status);   
      setAdminNote(freshKycData.data.adminNote || '');   
    } catch (error) {
      console.error("Error uploading KYC document:", error);
      alert("Failed to upload the document. Please try again.");
    }
  };

  const handleBack = () => {
    navigate('/user-dashboard');  
  };

  const getLabelText = () => {
    if (status === 'rejected') {
      return 'You need to upload your document again';
    } else if (status === 'submitted' || status === 'approved') {
      return 'Update Document';
    }
    return 'Upload Document';
  };

  return (
    <div className="kyc-container">
      <button onClick={handleBack} className="back-button">Back to Dashboard</button>

      {(
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

          {documentUrl && (
            <div className="kyc-document">
              <h4>Uploaded Document:</h4>
              <img src={documentUrl} alt="KYC Document" className="kyc-image" />
            </div>
          )}

          
          <div className="upload-section">
            <h4>{getLabelText()}</h4>  
            <form onSubmit={handleSubmit}>
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*" 
                required 
              />
              <button type="submit" className="upload-button">Upload Document</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYC;
