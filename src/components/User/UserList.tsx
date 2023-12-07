import React from 'react';
import { Grid } from '@mui/material';
import UserCard from './UserCard';
import { UserData } from '../../types/userData';

interface UserListProps {
  users: UserData[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Grid container spacing={4}>
      {users.map((user) => (
        <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
