import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => { 
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Попередня
      </button>
      <span>Сторінка {currentPage} з {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Наступна
      </button>
    </div>
  );
};

export default Pagination;


