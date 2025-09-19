import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  LocalHospital as DoctorIcon,
  MedicalServices as NurseIcon,
  Business as StaffIcon,
  PersonOutline as PatientIcon,
} from '@mui/icons-material';

const RoleManagement = ({ user, onRoleSwitch }) => {
  const handleRoleSwitch = (newRole) => {
    onRoleSwitch(newRole);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Role Management
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Switch between roles to test different permission levels
        </Typography>

        <Stack direction='column' spacing={2}>
          <Stack direction='row' spacing={1} flexWrap='wrap'>
            <Button
              variant={user.role === 'admin' ? 'contained' : 'outlined'}
              color='error'
              startIcon={<AdminIcon />}
              onClick={() => handleRoleSwitch('admin')}
              disabled={user.role === 'admin'}
              size='small'
            >
              Admin
            </Button>
            <Button
              variant={user.role === 'staff' ? 'contained' : 'outlined'}
              color='info'
              startIcon={<StaffIcon />}
              onClick={() => handleRoleSwitch('staff')}
              disabled={user.role === 'staff'}
              size='small'
            >
              Staff
            </Button>
            <Button
              variant={user.role === 'doctor' ? 'contained' : 'outlined'}
              color='success'
              startIcon={<DoctorIcon />}
              onClick={() => handleRoleSwitch('doctor')}
              disabled={user.role === 'doctor'}
              size='small'
            >
              Doctor
            </Button>
          </Stack>
          <Stack direction='row' spacing={1} flexWrap='wrap'>
            <Button
              variant={user.role === 'nurse' ? 'contained' : 'outlined'}
              color='primary'
              startIcon={<NurseIcon />}
              onClick={() => handleRoleSwitch('nurse')}
              disabled={user.role === 'nurse'}
              size='small'
            >
              Nurse
            </Button>
            <Button
              variant={user.role === 'patient' ? 'contained' : 'outlined'}
              color='secondary'
              startIcon={<PatientIcon />}
              onClick={() => handleRoleSwitch('patient')}
              disabled={user.role === 'patient'}
              size='small'
            >
              Patient
            </Button>
          </Stack>
        </Stack>

        <Alert severity='info' sx={{ mt: 2 }}>
          Role changes take effect immediately and will update the navigation
          menu and dashboard content.
        </Alert>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;
