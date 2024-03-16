import { useState } from "react";
import blogService from "../services/blogs";

function BlogForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  function addBlog(e) {
    e.preventDefault();

    if (!title || !author) return;

    onCreate({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input
            data-testid="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">author</label>
          <input
            data-testid="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            data-testid="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default BlogForm;
