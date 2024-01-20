import { ContactFormData, ContactsResponse, } from "interfaces/view/contact";

export interface ContactTableProps {
    data: ContactsResponse | null,
    actions: {
        onEdit: (data: ContactFormData) => void,
        onDelete: (data: ContactFormData) => void,
    },
    isLoading: boolean,
    pageNumber: number,
    pageSize: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    setPageSize: React.Dispatch<React.SetStateAction<number>>
}

