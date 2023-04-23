import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'services/getContacts';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload
        );
      })
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected)
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected)
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        handleFulfilled
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
