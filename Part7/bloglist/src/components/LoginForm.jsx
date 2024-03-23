import { useField } from '../hooks';
import { useContext } from 'react';
import NotificationContext from '../contexts/notificationContext';
import UserContext from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';

function LoginForm() {
  const username = useField('text');
  const password = useField('password');

  const { user, getUser } = useContext(UserContext);
  const { notification, dispatch } = useContext(NotificationContext);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const userData = { username: username.value, password: password.value };

    try {
      await getUser(userData);

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          message: `${userData.username} logged in`,
          class: 'success',
        },
      });

      navigate('/');

      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
      }, 5000);
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          message: error.response?.data?.error,
          class: 'error',
        },
      });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
      }, 5000);
    }
  }

  return (
    <div>
      <form data-testid="loginform" onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            {...username}
            variant="filled"
            sx={{ width: '50%' }}
          />
        </div>

        <div>
          <TextField
            label="password"
            {...password}
            variant="filled"
            sx={{ width: '50%', mt: 2 }}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
          >
            login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
