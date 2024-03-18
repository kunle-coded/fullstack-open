import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: "",
  isNotification: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotificaton(state, action) {
      state.notification = action.payload;
      state.isNotification = true;
    },

    removeNotificaton() {
      return initialState;
    },
  },
});

export const { createNotificaton, removeNotificaton } =
  notificationSlice.actions;

export const setNotification = (notification, time) => {
  return (dispatch) => {
    dispatch(createNotificaton(notification));

    setTimeout(() => {
      dispatch(removeNotificaton());
    }, time);
  };
};

export default notificationSlice.reducer;
