import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(localStorage.getItem('loggedUser')) || initialState,
  reducers: {
    addUser(state, action) {
      localStorage.setItem('loggedUser', JSON.stringify(action.payload));
      return state;
    },

    logoutUser() {
      localStorage.removeItem('loggedUser');
      return initialState;
    },
  },
});

export const { addUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
