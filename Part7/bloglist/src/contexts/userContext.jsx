import { createContext, useContext, useReducer } from 'react';
import blogService from '../services/blogs';
import NotificationContext from './notificationContext';

const initialState = JSON.parse(localStorage.getItem('user')) || null;

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER': {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return action.payload;
    }

    case 'REMOVE_USER':
      localStorage.removeItem('user');
      return null;
    default:
      return state;
  }
}

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialState);

  async function getUser(userData) {
    try {
      const userDetails = await blogService.login(userData);
      blogService.setToken(userDetails.token);
      dispatch({ type: 'ADD_USER', payload: userDetails });
    } catch (error) {
      throw error;
    }
  }

  return (
    <UserContext.Provider value={{ user, getUser, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
