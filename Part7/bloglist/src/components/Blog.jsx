import { useContext } from 'react';
import UserContext from '../contexts/userContext';
import { Link } from 'react-router-dom';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Blog = ({ blog, index }) => {
  const { user } = useContext(UserContext);

  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
  );
};
export default Blog;
