import React from 'react';
import { Button, Typography } from '@mui/material';
import { RootState, UserData } from '../../../types/userData';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedUser } from '../../../redux/slice/userSlice';
import {HowToRegTwoTone} from '@mui/icons-material'

interface UserButtonProps {
  user: UserData;
}

const UserButton: React.FC<UserButtonProps> = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state: RootState) => state.user);

  const checkIfUserIsInTeam = (user: UserData) => {
    return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  };

  const handleTeamAdd = async (user: UserData) => {
    try {
      if (user.available && !checkIfUserIsInTeam(user)) {
        //  Instructions not clear in the Documentation, still a sample API call to this
        // await axios
        //   .post(import.meta.env.VITE_API_KEY + '/team', {
        //     userId: user.id,
        //     teamId: deviceID
        //   })
        //   .then(() => {});
        addUserToTeam(user);
        toast.success('Added to team!');
      } else {
        if (!user.available) toast.error('User is not available');
        else if (checkIfUserIsInTeam(user))
          toast.error('User is already in the team');
        else toast.error('User is not available');
      }
    } catch (error) {
      console.error('Error adding to team:', error);
      toast.error('Error adding to team');
    }
  };
  const addUserToTeam = (user: UserData) => {
    dispatch(addSelectedUser(user));
    return Promise.resolve();
  };

  return (
    <>
      {checkIfUserIsInTeam(user) ? (
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            color: 'green',
            mt: 2,
            textAlign: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems:'center'
          }}
        >
          <HowToRegTwoTone sx={
            {
              color: 'green',
              mr: 1
            }
          }/> {' '}
          Added
        </Typography>
      ) : (
        <Button
          variant="contained"
          onClick={() => handleTeamAdd(user)}
          sx={{
            mt: 2,
            backgroundColor: 'primary.main',
            color: 'white',
            alignSelf: 'center',
            flexGrow: 1,
            width: '100%',
          }}
          disabled={!user.available}
        >
          Add to team
        </Button>
      )}
    </>
  );
};

export default UserButton;
