import { ContactFormData } from "interfaces/view/contact";

export interface ContactTableProps {
    data: ContactFormData[],
    actions: {
        onEdit: (data: ContactFormData) => void,
        onDelete: (data: ContactFormData) => void,
    }
}

