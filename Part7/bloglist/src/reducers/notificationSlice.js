import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  class: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.message = action.payload.message;
      state.class = action.payload.class;
    },

    removeNotification() {
      return initialState;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
