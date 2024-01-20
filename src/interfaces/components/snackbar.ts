export interface SnackbarProps {
    open: boolean,
    handleClose: () => void,
    type: 'success' | 'error' 
} 