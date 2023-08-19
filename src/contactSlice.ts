import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
  },
});

export const { addContact } = contactSlice.actions;

export default contactSlice.reducer;
