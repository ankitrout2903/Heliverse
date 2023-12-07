import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setUsers } from '../../redux/slice/userSlice';
import UserList from './UserList';
import { RootState } from '../../types/userData';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';

interface UserPaginationProps {
  page: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  maxPages: number;
  setMaxPages: React.Dispatch<React.SetStateAction<number>>;
}

const UserPagination: React.FC<UserPaginationProps> = ({
  page,
  loading,
  setLoading,
  maxPages,
  setMaxPages,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  const fetchUsers = async (page: number, limit: number) => {
    setLoading(true);

    try {
      const res = await axios.get(import.meta.env.VITE_API_KEY + '/users', {
        params: {
          page: page,
          limit: limit,
        },
      });

      dispatch(setUsers(res.data.userList));
      setMaxPages(res.data.maxPage);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    await dispatch(setPage(newPage));
    await fetchUsers(newPage, 16);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1, 16);
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
        width: '100%',
      }}
    >
      {loading ? (
        <CircularProgress style={{ marginTop: '1rem' }} />
      ) : (
        <>
          <UserList users={users} />

          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2rem',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || loading}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <ArrowBackIosRounded />
              Previous
            </Button>
            <Typography
              variant="h6"
              style={{
                fontWeight: 'bold',
                flexGrow: 1,
                textAlign: 'center',
              }}
            >
              Page {page} of {maxPages}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === maxPages || users.length === 0 || loading}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              Next
              <ArrowForwardIosRounded />
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default UserPagination;
