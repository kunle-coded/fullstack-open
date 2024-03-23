import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { addNotification, removeNotification } from './notificationSlice';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    deleteBlog(state, action) {
      const newArr = state.filter((blog) => blog.id !== action.payload.id);
      return (state = newArr);
    },

    editBlog(state, action) {
      const newArr = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      );

      return (state = newArr);
    },

    appendBlog(state, action) {
      state.push(action.payload);
    },

    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, setBlogs, deleteBlog, editBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content);

    dispatch(appendBlog(blog));
  };
};

export const likeBlog = (id) => {
  return async () => {
    await blogService.update(id);
  };
};

export const deleteBlogs = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog);

      dispatch(deleteBlog(blog));
      dispatch(
        addNotification({
          message: `${blog.title} by ${blog.author} deleted`,
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
  };
};

export const updateBlogs = (blog) => {
  return async (dispatch) => {
    try {
      const res = await blogService.edit(blog);

      dispatch(editBlog(res));

      dispatch(
        addNotification({
          message: `${blog.title} by ${blog.author} edited`,
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
  };
};

export default blogSlice.reducer;
