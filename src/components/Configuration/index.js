import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useUser } from '../../context/UserContext';
import UserInformation from './UserInformation';
import RoleManagement from './RoleManagement';
import CurrentPermissions from './CurrentPermissions';
import RoleComparisonTable from './RoleComparisonTable';

const Configuration = () => {
  const { user, permissions, switchRole } = useUser();

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Configuration
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Manage role-based authentication and user permissions
      </Typography>

      <Grid container spacing={3}>
        {/* User Information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <UserInformation user={user} />
        </Grid>

        {/* Role Switching */}
        <Grid size={{ xs: 12, md: 6 }}>
          <RoleManagement user={user} onRoleSwitch={handleRoleSwitch} />
        </Grid>

        {/* Current Permissions */}
        <Grid size={{ xs: 12 }}>
          <CurrentPermissions user={user} permissions={permissions} />
        </Grid>

        {/* Permission Comparison */}
        <Grid size={{ xs: 12 }}>
          <RoleComparisonTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Configuration;
