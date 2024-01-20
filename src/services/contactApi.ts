import axios, { AxiosResponse } from 'axios';
import { ContactFormData, ContactParams } from 'interfaces/view/contact';


const apiUrl = process.env.REACT_APP_API_BASE_URL || 'https://contacts-management-a936dcf43aca.herokuapp.com';

export const fetchContacts = async (params: ContactParams
): Promise<ContactFormData> => {
    try {
        const response: AxiosResponse<ContactFormData> = await axios.get(`${apiUrl}/contact`, {
            params: {
                ...params
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export const createContact = async (formData: ContactFormData): Promise<ContactFormData> => {
    try {
        const response: AxiosResponse<ContactFormData> = await axios.post(`${apiUrl}/contact`, formData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create contact form data');
    }
};

export const updateContact = async (
    id: string,
    formData: ContactFormData
): Promise<ContactFormData> => {
    try {
        const response: AxiosResponse<ContactFormData> = await axios.put(`${apiUrl}/contact/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update contact form data');
    }
};

export const deleteContact = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${apiUrl}/contacts/${id}`);
    } catch (error) {
        throw new Error('Failed to delete contact form data');
    }
};