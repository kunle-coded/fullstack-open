import { useRef, useState } from 'react';
import Togglable from './Togglable';
import EditForm from './EditForm';
import { useDispatch } from 'react-redux';
import { deleteBlog, deleteBlogs, likeBlog } from '../reducers/blogSlice';
import {
  addNotification,
  removeNotification,
} from '../reducers/notificationSlice';

const Blog = ({ blog, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();

  const editToggleRef = useRef(null);

  function handleLike() {
    setIsLiked(true);

    const toLike = { ...blog, isLike: true };

    dispatch(likeBlog(toLike));

    setTimeout(() => {
      setIsLiked(false);
    }, 5000);
  }

  function handleDelete() {
    if (window.confirm(`Remove ${blog.title}! by ${blog.author}`)) {
      dispatch(deleteBlogs(blog));
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
