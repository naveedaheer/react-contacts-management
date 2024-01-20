import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteConfirmationProps } from 'interfaces/components/confirmation';
import { CircularProgress } from '@mui/material';

export const DeleteConfirmationDialog = ({ onDelete, open, handleClose, isLoading }: DeleteConfirmationProps) => {
    const handleDelete = () => {
        onDelete();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary" disabled={isLoading}>
                    {isLoading ?
                        <CircularProgress size={'20px'} /> : 'Delete'}
                </Button>

            </DialogActions>
        </Dialog>
    );
};