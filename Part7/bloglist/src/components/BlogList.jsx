import { useRef, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import blogService from '../services/blogs';
import Togglable from '../components/Togglable';
import Blog from './Blog';
import BlogForm from './BlogForm';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

// Display list of blogs

function BlogList() {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const blogs = result.data;

  const blogFormRef = useRef(null);

  if (result.isLoading) {
    return <div>Loading blogs...</div>;
  }

  function handleCreate() {
    blogFormRef.current.toggleVisibility();
  }

  return (
    <div>
      <Box component="section">
        <Typography variant="h4">Blogs</Typography>
        <Togglable butonLabel="new blog" ref={blogFormRef}>
          <BlogForm onCreate={handleCreate} />
        </Togglable>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableBody>
            {blogs.map((blog, index) => (
              <Blog key={blog.id} blog={blog} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BlogList;
