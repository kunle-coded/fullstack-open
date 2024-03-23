import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../contexts/userContext';

// Material UI
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

function Navigation() {
  const { user, dispatch } = useContext(UserContext);

  function handleLogout() {
    dispatch({ type: 'REMOVE_USER' });
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOGLIST
          </Typography>

          <Box sx={{ flexGrow: 1, ml: 5, display: { md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Blogs
              </Link>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <Link
                to="/users"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Users
              </Link>
            </Button>
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              {user.username} logged in
              <Button variant="contained" sx={{ ml: 2 }} onClick={handleLogout}>
                logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
