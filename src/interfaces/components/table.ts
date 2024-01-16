
export interface ContactTableProps {
    data: IContactData[],
    actions: {
        onEdit: (data: IContactData) => void,
        onDelete: (data: IContactData) => void,
    }
}

export interface IContactData {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: number
}