import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ContactFormData } from 'interfaces/view/contact'
import { RootState } from 'store'

// Define a type for the slice state
interface ContactState {
    contactList: ContactFormData[]
}

// Define the initial state using that type
const initialState: ContactState = {
    contactList: [],
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        updateContactList: (state, action: PayloadAction<ContactFormData[]>) => {
            state.contactList = action.payload
        },
    },
})

export const { updateContactList } = contactSlice.actions
export const contactSelector = (state: RootState) => state.contact;
export default contactSlice.reducer