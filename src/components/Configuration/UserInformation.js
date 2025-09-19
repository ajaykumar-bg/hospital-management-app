import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { roleConfig } from './constants';

const UserInformation = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Current User
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Name
          </Typography>
          <Typography variant='body1'>{user.name}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Email
          </Typography>
          <Typography variant='body1'>{user.email}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Role
          </Typography>
          <Chip
            icon={roleConfig[user.role]?.icon || <PersonIcon />}
            label={user.role.toUpperCase()}
            color={roleConfig[user.role]?.color || 'primary'}
            variant='filled'
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Department
          </Typography>
          <Typography variant='body1'>{user.department}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserInformation;
