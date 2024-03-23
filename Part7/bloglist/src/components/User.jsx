import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function User({ user }) {
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </StyledTableCell>
      <StyledTableCell align="right">{user.blogs.length}</StyledTableCell>
    </StyledTableRow>
  );
}

export default User;
