import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import UserContext from '../contexts/userContext';
import NotificationContext from '../contexts/notificationContext';
import Togglable from './Togglable';
import EditForm from './EditForm';
import { useField } from '../hooks';
import { Box, Button, TextField, Typography } from '@mui/material';

function SingleBlog() {
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useContext(UserContext);
  const { notification, dispatch } = useContext(NotificationContext);

  const navigate = useNavigate();

  const comment = useField('text');

  const result = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll });
  const blogs = result.data;
  const blogID = useParams();

  const blog = blogs?.find((blog) => blog.id === blogID.id);

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const commentMutation = useMutation({
    mutationFn: blogService.comment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          message: `${blog.title} by ${blog.author} deleted`,
          class: 'success',
        },
      });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
      }, 5000);
    },
    onError: (error) => {
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
    },
  });

  const editToggleRef = useRef(null);

  function handleLike() {
    setIsLiked(true);

    const content = { ...blog, isLike: true };

    const rights = user.token;

    likeMutation.mutate({ content, rights });

    setTimeout(() => {
      setIsLiked(false);
    }, 3000);
  }

  function handleDelete() {
    const content = { ...blog };

    const rights = user.token;

    if (window.confirm(`Remove ${blog.title}! by ${blog.author}`)) {
      deleteMutation.mutate({ content, rights });
      navigate(-1);
    }
  }

  function handleEdit() {
    editToggleRef.current.toggleVisibility();
  }
  function handleComment() {
    const content = {
      ...blog,
      comment: comment.value,
    };

    const rights = user.token;

    commentMutation.mutate({ content, rights });
  }

  if (result.isLoading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <Box component="section">
      <div>
        <Typography variant="h5" gutterBottom>
          {blog.title} {blog.author}{' '}
        </Typography>
      </div>
      <Box>
        <Typography gutterBottom>
          <a href={blog.url}>{blog.url}</a>
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }} gutterBottom>
          Likes {blog.likes}
          <Button
            variant="contained"
            sx={{ ml: 1, p: 0.2 }}
            onClick={handleLike}
          >
            like
          </Button>{' '}
          {isLiked ? <span style={{ color: 'red' }}>&hearts;</span> : null}
        </Typography>
        <Typography gutterBottom>Added by {blog.author}</Typography>
        <div>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleDelete}>
            remove
          </Button>
          <Togglable butonLabel="edit blog" ref={editToggleRef}>
            <EditForm blog={blog} onSave={handleEdit} />
          </Togglable>
        </div>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Comments
          </Typography>

          <Box sx={{ mt: 3 }}>
            <ul>
              {blog.comments.map((comment, index) => (
                <li key={index}>
                  <Typography>{comment}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ mt: 5 }}>
            <TextField variant="filled" sx={{ width: '50%' }} {...comment} />
            <Button variant="contained" sx={{ ml: 3 }} onClick={handleComment}>
              Add comment
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SingleBlog;
