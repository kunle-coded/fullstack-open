/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return (state = action.payload);

    case "CLEAR":
      return (state = "");
    default:
      break;
  }
};

const NotificationContext = createContext();

export function NotificationContextProvider({ children }) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
