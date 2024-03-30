import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

import LoginForm from './components/LoginForm';

import Notification from './components/Notification';

import UserContext from './contexts/userContext';
import BlogList from './components/BlogList';
import Users from './components/Users';
import SingleUser from './components/SingleUser';
import SingleBlog from './components/SingleBlog';
import Navigation from './components/Navigation';

const App = () => {
  const { user, dispatch } = useContext(UserContext);

  function handleLogout() {
    dispatch({ type: 'REMOVE_USER' });
  }

  return (
    <Container>
      <Navigation />

      <Notification />

      <Routes>
        <Route
          path="/"
          element={user ? <BlogList /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users/:id"
          element={user ? <SingleUser /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/blogs/:id"
          element={user ? <SingleBlog /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </Container>
  );
};

export default App;
