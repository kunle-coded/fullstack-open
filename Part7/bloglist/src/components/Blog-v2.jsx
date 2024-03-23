import { useContext, useRef, useState } from 'react';
import Togglable from './Togglable';
import EditForm from './EditForm';
import blogService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserContext from '../contexts/userContext';
import NotificationContext from '../contexts/notificationContext';

const Blog = ({ blog, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useContext(UserContext);
  const [notification, dispatch] = useContext(NotificationContext);

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
    }, 5000);
  }

  function handleDelete() {
    const content = { ...blog };

    const rights = user.token;

    if (window.confirm(`Remove ${blog.title}! by ${blog.author}`)) {
      deleteMutation.mutate({ content, rights });
    }
  }

  function handleEdit() {
    editToggleRef.current.toggleVisibility();
  }

  const showWhenVisible = {
    display: isVisible ? '' : 'none',
  };

  return (
    <div className="blog">
      {/* <Link to={`/users/${user.id}`}>{user.name}</Link> */}
      <div>
        {blog.title} {blog.author}{' '}
        <button
          data-testid="view-details"
          name="view"
          onClick={() => setIsVisible((prevState) => !prevState)}
        >
          {isVisible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button
            data-testid={`likes-count-${index}`}
            className="like-button"
            onClick={handleLike}
          >
            like
          </button>{' '}
          {isLiked ? <span>&hearts;</span> : null}
        </div>
        <div>{blog.author}</div>
        <div>
          <button onClick={handleDelete}>remove</button>
          <Togglable butonLabel="edit blog" ref={editToggleRef}>
            <EditForm blog={blog} onSave={handleEdit} />
          </Togglable>
        </div>
      </div>
    </div>
  );
};
export default Blog;
