import { configureStore } from "@reduxjs/toolkit";
import ContacteReducer from "./features/contact/contactSlice";
export const store = configureStore({
    reducer: {
        contact: ContacteReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
