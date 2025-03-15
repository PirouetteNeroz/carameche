import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarComponent = ({ snackbar, setSnackbar }) => {
    return (
        <Snackbar open={snackbar.show} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, show: false })}>
            <Alert severity={snackbar.color}>{snackbar.message}</Alert>
        </Snackbar>
    );
};

export default SnackbarComponent;
