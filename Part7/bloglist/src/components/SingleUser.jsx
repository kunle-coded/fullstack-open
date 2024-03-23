import { useQuery } from '@tanstack/react-query';
import userService from '../services/users';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function SingleUser() {
  const result = useQuery({ queryKey: ['users'], queryFn: userService.getAll });
  const users = result.data;

  const userID = useParams();

  const user = users?.find((user) => user.id === userID.id);

  if (result.isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <Typography variant="h4">{user.name}</Typography>

      <Box component="section" sx={{ mt: 3 }}>
        <Typography variant="h5">Added blogs</Typography>

        <ul>
          {user.blogs.length >= 1 ? (
            user.blogs.map((blog) => (
              <Typography key={blog.id}>
                <li>{blog.title}</li>
              </Typography>
            ))
          ) : (
            <Typography>
              <li>No blog post yet</li>
            </Typography>
          )}
        </ul>
      </Box>
    </div>
  );
}

export default SingleUser;
