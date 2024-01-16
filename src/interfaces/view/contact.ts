export interface ContactFormModalProps {
    open: boolean,
    onClose: () => void;
    onSubmit: (formData: ContactFormData) => void;
    mode: 'create' | 'edit';
    initialData?: ContactFormData;
}


export interface ContactFormData {
    id?: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string | number
}