import { useRef, useState } from "react";
import Togglable from "./Togglable";
import EditForm from "./EditForm";

const Blog = ({ blog, index, onLike, onDelete, onEdit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const editToggleRef = useRef(null);

  function handleLike() {
    setIsLiked(true);

    const toLike = { ...blog, isLike: true };
    onLike(toLike);

    setTimeout(() => {
      setIsLiked(false);
    }, 5000);
  }

  function handleDelete() {
    onDelete(blog);
  }

  function handleEdit(data) {
    onEdit(data);
    editToggleRef.current.toggleVisibility();
  }

  const showWhenVisible = {
    display: isVisible ? "" : "none",
  };

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}{" "}
        <button
          data-testid="view-details"
          name="view"
          onClick={() => setIsVisible((prevState) => !prevState)}
        >
          {isVisible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button
            data-testid={`likes-count-${index}`}
            className="like-button"
            onClick={handleLike}
          >
            like
          </button>{" "}
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
