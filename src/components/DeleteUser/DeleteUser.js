import React, { useState, useEffect } from 'react';
import getAllUsersService from '../../services/getAllUsersService';
import deleteUserService from '../../services/deleteUserService';
import Table from '../../SharedComponents/Table/Table';
import Pagination from '../../SharedComponents/Pagination/Pagination';
import PageSize from '../../SharedComponents/PageSize/PageSize';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DeleteUser.css';

const DeleteUser = () => {
  const [userData, setUserData] = useState([]);
  const [header, setHeader] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  
  const fetchUsers = async () => {
    try {
      const response = await getAllUsersService({
        page: currentPage,
        limit: pageSize,
      });

      if (response.data.length > 0) {
        const headers = ['id', 'username', 'actions'];
        setHeader(headers);

        const usersWithActions = response.data.map((user) => ({
          id: user.id,
          username: user.username,
          actions: (
            <button
              className="delete-button"
              onClick={() => handleOpenModal(user)}
            >
              Delete
            </button>
          ),
        }));

        setUserData(usersWithActions);

        setTotalPages(
          Math.ceil(Number(response.headers['x-total-count']) / pageSize)
        );
      } else {
        setUserData([]);
        setHeader([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users. Please try again.');
    }
  };

 
  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize]);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  
  const deleteUserHandler = async () => {
    try {
      await deleteUserService(selectedUser.id);
      toast.success('User deleted successfully!');
       
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="delete-users-container">
      <ToastContainer />
      <h2 className="delete-users-heading">Delete Users</h2>
      {userData.length > 0 ? (
        <>
          <Table headers={header} tableData={userData} />
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
        <div className="no-data">No users available</div>
      )}

       
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <h3>Are you sure you want to delete this user?</h3>
            <p>{selectedUser?.username}</p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={deleteUserHandler}>
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

export default DeleteUser;
