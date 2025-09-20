import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import { useUser } from '../../context/UserContext';
import { settingsPageInfo } from './constants';

const UserInformation = () => {
  const { user } = useUser();

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {settingsPageInfo.userInfoTitle}
        </Typography>
        <Box display='flex' alignItems='center' gap={2} mb={2}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'primary.main',
              fontSize: '1.25rem',
            }}
          >
            {user.name
              .split(' ')
              .map((word) => word.charAt(0))
              .join('')
              .substring(0, 2)}
          </Avatar>
          <Box>
            <Typography variant='subtitle1' fontWeight='medium'>
              {user.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {user.email}
            </Typography>
            <Chip
              label={user.role.toUpperCase()}
              size='small'
              color='primary'
              variant='outlined'
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant='body2' color='text.secondary'>
          <strong>Department:</strong> {user.department}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          <strong>Phone:</strong> {user.phone}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserInformation;
