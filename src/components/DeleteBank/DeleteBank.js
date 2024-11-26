import React, { useState, useEffect } from 'react';
import getAllBanksService from '../../services/getAllBanksService';
import deleteBankService from '../../services/deleteBankService';
import Table from '../../SharedComponents/Table/Table';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DeleteBank.css';

const DeleteBank = () => {
  const [bankData, setBankData] = useState([]);
  const [header, setHeader] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [filters, setFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getAllBanksService({
          page: currentPage,
          limit: pageSize,
          ...filters,
        });

        if (response.data.length > 0) {
          const headers = ['id', 'name', 'abbreviation', 'actions'];
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
        toast.error('Failed to fetch banks. Please try again.');
      }
    };

    fetchBanks();
  }, [filters, pageSize, currentPage]);

  const handleOpenModal = (bank) => {
    setSelectedBank(bank);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBank(null);
    setShowModal(false);
  };

  const deleteBankHandler = async () => {
    try {
      await deleteBankService(selectedBank.id);
      toast.success('Bank deleted successfully!');
      setBankData((prevData) =>
        prevData.filter((bank) => bank.id !== selectedBank.id)
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting bank:', error);
      toast.error('Failed to delete bank. Please try again.');
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="delete-bank-container">
      <ToastContainer />
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

   
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <h3>Are you sure you want to delete this bank?</h3>
            <p>
              {selectedBank?.name} ({selectedBank?.abbreviation})
            </p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={deleteBankHandler}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCloseModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBank;
