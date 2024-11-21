import React, { useState, useEffect } from 'react';
import getAllBanksService from '../../services/getAllBanksService'; // Service to fetch all banks
import deleteBankService from '../../services/deleteBankService'; // Service to delete a bank
import Table from '../../SharedComponents/Table/Table';
import Modal from '../../SharedComponents/Modal/Modal'; // Import your modal component
import './DeleteBank.css';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import Pagination from '../../SharedComponents/Pagination/Pagination';

const DeleteBank = () => {
  const [bankData, setBankData] = useState([]);
  const [header, setHeader] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default number of rows per page
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedBank, setSelectedBank] = useState(null); // Bank selected for deletion

  // Fetch all banks whenever filters, pageSize, or currentPage change
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getAllBanksService({
          page: currentPage,
          limit: pageSize,
          ...filters,
        });

        if (response.data.length > 0) {
          const headers = ['id', 'name', 'abbreviation', 'actions']; // Table headers
          setHeader(headers);

          const banksWithActions = response.data.map((bank) => ({
            id: bank.id,
            name: bank.name,
            abbreviation: bank.abbreviation,
            actions: (
              <button
                className="delete-button"
                onClick={() => handleOpenModal(bank)}
              >
                Delete
              </button>
            ),
          }));

          setBankData(banksWithActions);

          // Update total pages
          setTotalPages(
            Math.ceil(Number(response.headers['x-total-count']) / pageSize)
          );
        } else {
          setBankData([]);
          setHeader([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
  }, [filters, pageSize, currentPage]);

  // Handle modal open
  const handleOpenModal = (bank) => {
    setSelectedBank(bank); // Set the bank to delete
    setShowModal(true); // Show modal
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedBank(null);
    setShowModal(false);
  };

  // Handle delete action
  const deleteBankHandler = async () => {
    try {
      await deleteBankService(selectedBank.id);
      alert('Bank deleted successfully!');
      setBankData((prevData) => prevData.filter((bank) => bank.id !== selectedBank.id));
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error('Error deleting bank:', error);
      alert('Failed to delete bank. Please try again.');
    }
  };

  // Handle pagination
  const handlePageChange = (page) => setCurrentPage(page);

  // Handle page size change
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="delete-bank-container">
      <h2 className="delete-bank-heading">Delete Bank</h2>
      {bankData.length > 0 ? (
        <>
          <Table headers={header} tableData={bankData} />
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <PageSize
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </>
      ) : (
        <div className="no-data">No banks available</div>
      )}

      {/* Modal for delete confirmation */}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h3>Are you sure you want to delete this bank?</h3>
          <p>{selectedBank?.name} ({selectedBank?.abbreviation})</p>
          <div className="modal-actions">
            <button className="confirm-button" onClick={deleteBankHandler}>
              Yes, Delete
            </button>
            <button className="cancel-button" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeleteBank;
