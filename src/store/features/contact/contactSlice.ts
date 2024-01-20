import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContactFormData, ContactParams } from 'interfaces/view/contact';
import { createContact, deleteContact, fetchContacts, updateContact } from 'services/contactApi';
import { RootState } from 'store';

// Define a type for the slice state
interface ContactState {
    fetchData: {
        data: ContactFormData[] | null;
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
    };
    createData: {
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
    };
    updateData: {
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
    };
    deleteData: {
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
    };
}

// Define the initial state using that type
const initialState: ContactState = {
    fetchData: {
        data: null,
        status: 'idle',
        error: null,
    },
    createData: {
        status: 'idle',
        error: null,
    },
    updateData: {
        status: 'idle',
        error: null,
    },
    deleteData: {
        status: 'idle',
        error: null,
    },

}
export const fetchContactFormDataAsync = createAsyncThunk(
    'contact/fetchContact',
    async (params: ContactParams) => {
        return fetchContacts(params);
    }
);
export const createContactFormDataAsync = createAsyncThunk(
    'contactForm/createData',
    async (formData: ContactFormData) => {
        return createContact(formData);
    }
);

export const updateContactFormDataAsync = createAsyncThunk(
    'contactForm/updateData',
    async ({ id, formData }: { id: string; formData: ContactFormData }) => {
        return updateContact(id, formData);
    }
);

export const deleteContactFormDataAsync = createAsyncThunk(
    'contactForm/deleteData',
    async (id: string) => {
        return deleteContact(id);
    }
);
export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchContactFormDataAsync.pending, (state) => {
            state.fetchData.status = 'loading';
        })
            .addCase(fetchContactFormDataAsync.fulfilled, (state, action: any) => {
                state.fetchData.status = 'succeeded';
                state.fetchData.data = action.payload;
            })
            .addCase(fetchContactFormDataAsync.rejected, (state, action) => {
                state.fetchData.status = 'failed';
                state.fetchData.error = action.error.message ?? 'Unknown error';
            })
            .addCase(createContactFormDataAsync.pending, (state) => {
                state.createData.status = 'loading';
            })
            .addCase(createContactFormDataAsync.fulfilled, (state, action) => {
                state.createData.status = 'succeeded';
                // Add the created data to the state if needed
            })
            .addCase(createContactFormDataAsync.rejected, (state, action: any) => {
                state.createData.status = 'failed';
                state.createData.error = action.payload ?? 'Failed to create contact form data';
            })
            .addCase(updateContactFormDataAsync.pending, (state) => {
                state.updateData.status = 'loading';
            })
            .addCase(updateContactFormDataAsync.fulfilled, (state, action) => {
                state.updateData.status = 'succeeded';
                // Update the data in the state if needed
            })
            .addCase(updateContactFormDataAsync.rejected, (state, action: any) => {
                state.updateData.status = 'failed';
                state.updateData.error = action.payload ?? 'Failed to update contact form data';
            })
            .addCase(deleteContactFormDataAsync.pending, (state) => {
                state.deleteData.status = 'loading';
            })
            .addCase(deleteContactFormDataAsync.fulfilled, (state, action) => {
                state.deleteData.status = 'succeeded';
                // Remove the deleted data from the state if needed
            })
            .addCase(deleteContactFormDataAsync.rejected, (state, action: any) => {
                state.deleteData.status = 'failed';
                state.deleteData.error = action.payload ?? 'Failed to delete contact form data';
            });
    },
    reducers: {
        // updateContactList: (state, action: PayloadAction<ContactFormData[]>) => {
        //     state.contactList = action.payload
        // },
    },
})

// export const { } = contactSlice.actions
export const contactSelector = (state: RootState) => state.contact;
export default contactSlice.reducer