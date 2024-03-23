import { useContext, useState } from 'react';
import blogService from '../services/blogs';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogSlice';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import NotificationContext from '../contexts/notificationContext';
import UserContext from '../contexts/userContext';
import { Box, Button, TextField, Typography } from '@mui/material';

function BlogForm({ onCreate }) {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const { user } = useContext(UserContext);

  const { notification, dispatch } = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const newMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      console.log('mutate error', error);
    },
  });

  async function addBlog(e) {
    e.preventDefault();

    if (!title.value || !author.value) return;
    try {
      const content = {
        title: title.value,
        author: author.value,
        url: url.value,
      };

      const rights = user.token;

      newMutation.mutate({ content, rights });
      onCreate();

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          message: `New blog ${content.title} added`,
          class: 'success',
        },
      });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
      }, 5000);
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          message: error.response.data.error,
          class: 'error',
        },
      });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
      }, 5000);
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5">Create new</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            variant="filled"
            sx={{ width: '50%', mt: 2 }}
            {...title}
          />
        </div>

        <div>
          <TextField
            label="author"
            variant="filled"
            sx={{ width: '50%', mt: 2 }}
            {...author}
          />
        </div>
        <div>
          <TextField
            label="url"
            variant="filled"
            sx={{ width: '50%', mt: 2 }}
            {...url}
          />
        </div>
        <Button variant="contained" sx={{ my: 2 }} type="submit">
          create
        </Button>
      </form>
    </Box>
  );
}

export default BlogForm;
