import React from 'react';
import './Pagination.css';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
    if(currentPage===1) onPageChange(totalPages);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
    if(currentPage===totalPages) onPageChange(1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} >
        Next
      </button>
    </div>
  );
};

export default Pagination;
