import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogSlice';
import { logoutUser } from './reducers/userSlice';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from './requests';

const App = () => {
  const [user, setUser] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  const blogs = result.data;

  const blogFormRef = useRef(null);

  // useEffect(() => {
  //   setBlogs((blogs) => blogs);
  // }, [isSorted]);

  function handleCreate(newBlog) {
    blogFormRef.current.toggleVisibility();
  }

  function handleSort() {
    // setBlogs((blogs) => blogs.sort((a, b) => b.likes - a.likes));
    setIsSorted(true);
  }

  function handleLogout() {
    dispatch(logoutUser());
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <br />
        <LoginForm setUser={setUser} />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 20, color: 'blue' }}>
        Blog App, Fullstack Open
      </h1>
      <br />
      <h2>Blogs</h2>
      <br />

      <Notification />
      <br />
      <div>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Togglable butonLabel="new blog" ref={blogFormRef}>
        <BlogForm onCreate={handleCreate} />
      </Togglable>
      <br />
      <div>
        <button onClick={handleSort}>sort</button> - {isSorted ? 'sorted' : ''}
      </div>
      {blogs.map((blog, index) => (
        <Blog key={blog.id} blog={blog} index={index} />
      ))}
    </div>
  );
};

export default App;
