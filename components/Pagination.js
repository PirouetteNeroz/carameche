import React from 'react';
import { Pagination } from '@mui/material';

const PaginationComponent = ({ totalPages, currentPage, setCurrentPage }) => {
    return (
        <Pagination count={totalPages} page={currentPage} onChange={(e, page) => setCurrentPage(page)} style={{ marginTop: '16px' }} />
    );
};

export default PaginationComponent;
