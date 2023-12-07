import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { UserData } from '../../../types/userData';

interface UserNameProps {
  user: UserData;
}

const UserName: React.FC<UserNameProps> = ({ user }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      my: 1,
      height: '65px',
    }}
  >
    <Avatar alt={user.first_name + ' ' + user.last_name} src={user.avatar} />
    <Typography variant="h5" sx={{ flexGrow: 1, ml: 2 }}>
      {user.first_name} {user.last_name}
    </Typography>
  </Box>
);

export default UserName;
