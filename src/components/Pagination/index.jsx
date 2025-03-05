import React from 'react';
import { Button } from '../ui/Button';
import * as SC from './styles'; 

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <SC.WrapperPagination>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index + 1}
                    label={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    disabled={currentPage === index + 1}
                />
            ))}
        </SC.WrapperPagination>
    );
};


