export interface ContactFormModalProps {
    open: boolean,
    onClose: () => void;
    onSubmit: (formData: ContactFormData) => void;
    mode: 'create' | 'edit';
    initialData?: ContactFormData;
}


export interface ContactFormData {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string | number
}

export interface ContactParams{
    pageSize: number,
    pageNumber: number,
    firstName?: string,
    lastName?: string
}