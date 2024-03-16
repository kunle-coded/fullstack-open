import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationClass, setNotificationClass] = useState("");

  const blogFormRef = useRef(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setBlogs((blogs) => blogs);
  }, [isSorted]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedUser");
    if (loggedInUser) {
      const userInfo = JSON.parse(loggedInUser);
      setUser(userInfo);
      blogService.setToken(userInfo.token);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const userDetails = await blogService.login({ username, password });
      blogService.setToken(userDetails.token);
      localStorage.setItem("loggedUser", JSON.stringify(userDetails));
      setUser(userDetails);
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification(error.response.data.error);
      setNotificationClass("error");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }

  async function handleCreate(newBlog) {
    try {
      const request = await blogService.create(newBlog);
      setBlogs(blogs.concat(request));

      setNotification(
        `a new blog ${request.title}! by ${request.author} added`
      );
      setNotificationClass("success");

      blogFormRef.current.toggleVisibility();

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(blogObj) {
    try {
      if (window.confirm(`Remove ${blogObj.title}! by ${blogObj.author}`)) {
        const request = await blogService.remove(blogObj);

        setNotification(`${blogObj.title}! by ${blogObj.author} deleted`);
        setNotificationClass("success");

        // blogFormRef.current.toggleVisibility();

        // blogService.getAll().then((blogs) => setBlogs(blogs));

        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } catch (error) {
      setNotification(error.response.data.error);
      setNotificationClass("error");

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }

  async function handleBlogLike(liked) {
    try {
      const request = await blogService.update(liked);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBlogEdit(edited) {
    try {
      const request = await blogService.edit(edited);

      blogService.getAll().then((blogs) => setBlogs(blogs));

      setNotification(`blog ${request.title}! by ${request.author} edited`);
      setNotificationClass("success");

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSort() {
    setBlogs((blogs) => blogs.sort((a, b) => b.likes - a.likes));
    setIsSorted(true);
  }

  function handleLogout() {
    localStorage.removeItem("loggedUser");
    setUser(null);
  }

  if (user === null) {
    return (
      <LoginForm
        username={username}
        onAddUsername={setUsername}
        password={password}
        onAddPassword={setPassword}
        notification={notification}
        nameClass={notificationClass}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 20, color: "blue" }}>
        Blog App, Fullstack Open
      </h1>
      <br />
      <h2>Blogs</h2>
      <br />
      {notification !== null ? (
        <div data-testid="notification" className={notificationClass}>
          {notification}
        </div>
      ) : null}
      <br />
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Togglable butonLabel="new blog" ref={blogFormRef}>
        <BlogForm onCreate={handleCreate} />
      </Togglable>
      <br />
      <div>
        <button onClick={handleSort}>sort</button> - {isSorted ? "sorted" : ""}
      </div>
      {blogs.map((blog, index) => (
        <Blog
          key={blog.id}
          blog={blog}
          index={index}
          onLike={handleBlogLike}
          onDelete={handleDelete}
          onEdit={handleBlogEdit}
        />
      ))}
    </div>
  );
};

export default App;
