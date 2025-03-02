import React from 'react';

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};


