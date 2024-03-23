import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import blogService from '../services/blogs';
import {
  addNotification,
  removeNotification,
} from '../reducers/notificationSlice';
import Notification from './Notification';
import { addUser } from '../reducers/userSlice';

function LoginForm() {
  const username = useField('text');
  const password = useField('password');

  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    const userData = { username: username.value, password: password.value };

    try {
      const userDetails = await blogService.login(userData);
      blogService.setToken(userDetails.token);

      dispatch(addUser(userDetails));

      dispatch(
        addNotification({
          message: `${userDetails.username} logged in`,
          class: 'success',
        }),
      );

      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (error) {
      dispatch(
        addNotification({
          message: error.response.data.error,
          class: 'error',
        }),
      );

      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  }

  return (
    <div>
      <Notification />

      <form data-testid="loginform" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input data-testid="username" {...username} />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input data-testid="password" {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
