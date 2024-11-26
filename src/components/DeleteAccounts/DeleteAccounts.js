import React, { useState, useEffect } from 'react';
import deleteAccountService from '../../services/deleteAccountService';  
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import getAllAccountsService from '../../services/getAllAccountsService';
import { selectTableAttribute } from '../../utils/helper/selectTableAttribute';
import Modal from '../../SharedComponents/Modal/Modal';  
import { ToastContainer, toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';  
import './DeleteAccounts.css';

const DeleteAccounts = () => {
  const [header, setHeader] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ bankName: '' });
  const [showModal, setShowModal] = useState(false);  
  const [accountToDelete, setAccountToDelete] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterParams = {};
        if (filters.bankName) {
          filterParams.bankName = filters.bankName;
        }

        const response = await getAllAccountsService({
          page: currentPage,
          limit: pageSize,
          filters: filterParams,  
        });

        if (response.data.length > 0) {
          const updatedResponse = selectTableAttribute(response.data, [
            'accountNumber',
            'bankName',
            'accountBalance',
          ]);
          setHeader(Object.keys(updatedResponse[0]));
          setAccountData(updatedResponse);
          setTotalPages(Math.ceil(Number(response.headers['x-total-count']) / pageSize));
        } else {
          setHeader([]);
          setAccountData([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
        toast.error('Error fetching account data. Please try again.');
      }
    };

    fetchData();
  }, [filters, pageSize, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, bankName: value }));
    setCurrentPage(1);
  };

  const handleDeleteAccountClick = (accountNumber) => {
    setAccountToDelete(accountNumber); 
    setShowModal(true);  
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAccountService(accountToDelete); 
      toast.success('Account deleted successfully!');   
      setShowModal(false);  
      setAccountData((prevData) =>
        prevData.filter((account) => account.accountNumber !== accountToDelete)
      );
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account.');  
      setShowModal(false);  
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);  
  };

  return (
    <div className="get-accounts-container">
      <ToastContainer />   
      <div className="filters">
        <label htmlFor="bankName">Bank Name:</label>
        <input
          type="text"
          id="bankName"
          value={filters.bankName}
          onChange={handleFilterChange}
          placeholder="Enter bank name"
        />
      </div>

      <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />

      <div className="table-container">
        {accountData.length > 0 ? (
          <Table
            headers={[...header, 'Actions']}
            tableData={accountData.map((account) => ({
              ...account,
              actions: (
                <button
                  onClick={() => handleDeleteAccountClick(account.accountNumber)}
                  className="delete-account-button"
                >
                  Delete
                </button>
              ),
            }))}
          />
        ) : (
          <div className="no-data">No accounts found</div>
        )}
      </div>

      {showModal && (
        <Modal
          onSubmit={handleConfirmDelete}
          onCancel={handleCancelDelete}
          closeModal={handleCancelDelete}
          message={"Are you sure you want to delete this account?"}
        >
        </Modal>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DeleteAccounts;
