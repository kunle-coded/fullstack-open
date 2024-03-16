import { useState } from "react";

function EditForm({ blog, onSave }) {
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [url, setUrl] = useState(blog.url);

  function onSaveBlog(e) {
    e.preventDefault();

    if (!title || !author) return;

    const toEdit = { ...blog, title, author, url };

    onSave(toEdit);

    setTitle("");
    setAuthor("");
    setUrl("");
  }

  return (
    <div style={{ marginTop: 5 }}>
      <h3>Edit blog</h3>
      <form onSubmit={onSaveBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input
            data-testid="editTitle"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">author</label>
          <input
            data-testid="editAuthor"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            data-testid="editUrl"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default EditForm;
