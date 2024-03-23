import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

function Notification() {
  const { message, class: className } = useSelector(
    (state) => state.notification,
  );

  return (
    <div data-testid="notification" className={className}>
      {message}
    </div>
  );
}

export default Notification;
