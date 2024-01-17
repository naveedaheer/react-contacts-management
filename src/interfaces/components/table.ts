import { ContactFormData } from "interfaces/view/contact";

export interface ContactTableProps {
    data: ContactFormData[],
    actions: {
        onEdit: (data: ContactFormData) => void,
        onDelete: (data: ContactFormData) => void,
    },
    isLoading:boolean,
    pageNumber:number,
    pageSizeRowNumber:number,
    setPageNumber:React.Dispatch<React.SetStateAction<number>>,
    setPageSizeRowNumber:React.Dispatch<React.SetStateAction<number>>
}

