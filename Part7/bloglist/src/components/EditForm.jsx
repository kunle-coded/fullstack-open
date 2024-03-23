import { useState } from 'react';
import { Button, TextField } from '@mui/material';

function EditForm({ blog, onSave }) {
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [url, setUrl] = useState(blog.url);

  function onSaveBlog(e) {
    e.preventDefault();

    if (!title || !author) return;

    const toEdit = { ...blog, title, author, url };

    onSave();

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div style={{ marginTop: 25 }}>
      <h3>Edit blog</h3>
      <form onSubmit={onSaveBlog}>
        <div>
          <TextField
            label="Title"
            variant="filled"
            sx={{ width: '50%', mt: 2 }}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <TextField
            label="Author"
            variant="filled"
            sx={{ width: '50%', mt: 2 }}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Url"
            variant="filled"
            sx={{ width: '50%', mt: 2 }}
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="contained" sx={{ my: 2 }} type="submit">
          save
        </Button>
      </form>
    </div>
  );
}

export default EditForm;
