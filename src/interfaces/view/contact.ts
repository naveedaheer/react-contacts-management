export interface CreateContactModalProps {
    open: boolean,
    onClose: () => void;
    onCreate: (formData: ContactFormData) => void;
}

export interface ContactFormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}
