import { useState } from 'react';
import blogService from '../services/blogs';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import {
  addNotification,
  removeNotification,
} from '../reducers/notificationSlice';
import { createBlog } from '../reducers/blogSlice';

function BlogForm({ onCreate }) {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const dispatch = useDispatch();

  async function addBlog(e) {
    e.preventDefault();

    if (!title.value || !author.value) return;
    try {
      const content = {
        title: title.value,
        author: author.value,
        url: url.value,
      };

      dispatch(createBlog(content));
      onCreate();

      dispatch(
        addNotification({
          message: `new blog ${content.title} added`,
          class: 'success',
        }),
      );

      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (error) {
      dispatch(
        addNotification({
          message: error.response.data.error,
          class: 'error',
        }),
      );

      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input data-testid="title" {...title} />
        </div>

        <div>
          <label htmlFor="author">author</label>
          <input data-testid="author" {...author} />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input data-testid="url" {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default BlogForm;
