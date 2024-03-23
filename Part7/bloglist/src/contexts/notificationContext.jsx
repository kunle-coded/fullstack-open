import { createContext, useReducer } from 'react';

const initialState = {
  message: '',
  class: '',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return { message: action.payload.message, class: action.payload.class };

    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export function NotificationContextProvider({ children }) {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialState,
  );

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
