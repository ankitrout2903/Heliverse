import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TableHead,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { RootState } from '../types/userData';
import { removeSelectedUser } from '../redux/slice/userSlice';

const SelectedUsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUsers = useSelector(
    (state: RootState) => state.user.selectedUsers
  );

  const handleTeamRemove = (userId: number) => {
    // axios
    //   .delete(import.meta.env.VITE_API_KEY + '/team', {
    //     params: {
    //       id: deviceID,
    //       userId: userId,
    //     },
    //   })
    //   .then(() => {
    //   });
    dispatch(removeSelectedUser(userId));
  };

  if (selectedUsers.length === 0) {
    return (
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginTop: '2rem',
          alignSelf: 'center',
        }}
      >
        No users selected
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: '2rem',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'auto',
        border: '1px solid #e0e0e0',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          alignSelf: 'center',
        }}
      >
        Selected Users
      </Typography>
      <Table>
        <TableHead
          sx={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <TableRow
            sx={{
              'font-weight': 'bold',
            }}
          >
            <TableCell>User Name</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
              <TableCell>{user.domain}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleTeamRemove(user.id)}
                  sx={{
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#D10000',
                    },
                    '&:active': {
                      backgroundColor: '#ff0000',
                    },
                  }}
                >
                  <DeleteForeverRoundedIcon />
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SelectedUsersTable;
