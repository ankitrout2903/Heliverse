import { Typography } from '@mui/material';
import React from 'react';
import { UserData } from '../../../types/userData';
import {
WorkTwoTone,
HowToRegTwoTone,
  AlternateEmailTwoTone,
  CancelTwoTone,
  TransgenderTwoTone
} from '@mui/icons-material';

interface UserPropertiesProps {
  user: UserData;
}

const UserProperties: React.FC<UserPropertiesProps> = ({ user }) => (
  <>
    <PropertyItem
      icon={<WorkTwoTone sx={{ color: 'primary.main', mr: 1 }} />}
      text={user.domain}
    />
    <PropertyItem
      icon={<AlternateEmailTwoTone sx={{ color: 'primary.main', mr: 1 }} />}
      text={user.email}
    />
    <PropertyItem
      icon={<TransgenderTwoTone sx={{ color: 'primary.main', mr: 1 }} />}
      text={user.gender}
    />
    <PropertyItem
      icon={
        user.available ? (
          <HowToRegTwoTone sx={{ color: 'success.main', mr: 1 }} />
        ) : (
          <CancelTwoTone sx={{ color: 'error.main', mr: 1 }} />
        )
      }
      text={user.available ? 'Available' : 'Not Available'}
    />
  </>
);


interface PropertyItemProps {
  icon: React.ReactNode;
  text: string | React.ReactNode;
}

const PropertyItem: React.FC<PropertyItemProps> = ({ icon, text }) => (
  <Typography
    variant="subtitle1"
    sx={{
      color: 'text.secondary',
      mb: 1,
      display: 'flex',
      alignItems: 'center',
      textWrap: 'wrap'
    }}
  >
    {icon}
    {text}
  </Typography>
);



export default UserProperties;
