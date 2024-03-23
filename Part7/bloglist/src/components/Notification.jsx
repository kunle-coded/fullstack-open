import { useContext } from 'react';
import NotificationContext from '../contexts/notificationContext';
import { Alert, Container } from '@mui/material';

function Notification() {
  const { notification } = useContext(NotificationContext);

  // if (notification.message === '') return null;

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 2,
        mb: 2,
      }}
    >
      <Alert severity={notification.class}>{notification.message}</Alert>
    </Container>
  );
}

export default Notification;
