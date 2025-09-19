import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';

const Configuration = () => {
  const { user, permissions, switchRole } = useUser();

  const permissionLabels = {};

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
        <Grid item xs={12} md={6}>
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
                  icon={user.role === 'admin' ? <AdminIcon /> : <PersonIcon />}
                  label={user.role.toUpperCase()}
                  color={user.role === 'admin' ? 'error' : 'primary'}
                  variant='filled'
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Role Switching */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Management
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Switch between roles to test different permission levels
              </Typography>

              <Stack direction='row' spacing={2}>
                <Button
                  variant={user.role === 'admin' ? 'contained' : 'outlined'}
                  color='error'
                  startIcon={<AdminIcon />}
                  onClick={() => handleRoleSwitch('admin')}
                  disabled={user.role === 'admin'}
                >
                  Admin
                </Button>
                <Button
                  variant={user.role === 'user' ? 'contained' : 'outlined'}
                  color='primary'
                  startIcon={<PersonIcon />}
                  onClick={() => handleRoleSwitch('user')}
                  disabled={user.role === 'user'}
                >
                  User
                </Button>
              </Stack>

              <Alert severity='info' sx={{ mt: 2 }}>
                Role changes take effect immediately and will update the
                dashboard visibility.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Permissions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Current Permissions ({user.role.toUpperCase()})
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Dashboard sections visible to the current role
              </Typography>

              <Grid container spacing={2}>
                {Object.entries(permissions).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: value
                          ? 'success.lighter'
                          : 'error.lighter',
                        borderLeft: `4px solid ${
                          value ? '#4caf50' : '#f44336'
                        }`,
                      }}
                    >
                      <Typography variant='body2'>
                        {permissionLabels[key] || key}
                      </Typography>
                      <Chip
                        label={value ? 'Enabled' : 'Disabled'}
                        color={value ? 'success' : 'error'}
                        size='small'
                        variant='outlined'
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Permission Comparison */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Comparison
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Compare permissions between admin and user roles
              </Typography>

              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '8px',
                          borderBottom: '1px solid #ddd',
                        }}
                      >
                        Permission
                      </th>
                      <th
                        style={{
                          textAlign: 'center',
                          padding: '8px',
                          borderBottom: '1px solid #ddd',
                        }}
                      >
                        Admin
                      </th>
                      <th
                        style={{
                          textAlign: 'center',
                          padding: '8px',
                          borderBottom: '1px solid #ddd',
                        }}
                      >
                        User
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(permissionLabels).map((key) => (
                      <tr key={key}>
                        <td
                          style={{
                            padding: '8px',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          {permissionLabels[key]}
                        </td>
                        <td
                          style={{
                            textAlign: 'center',
                            padding: '8px',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          <Chip
                            label='✓'
                            color='success'
                            size='small'
                            variant='filled'
                          />
                        </td>
                        <td
                          style={{
                            textAlign: 'center',
                            padding: '8px',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          <Chip
                            label={
                              [
                                'canViewAIIndex',
                                'canViewProductRoadmap',
                                'canViewServiceRequest',
                              ].includes(key)
                                ? '✗'
                                : '✓'
                            }
                            color={
                              [
                                'canViewAIIndex',
                                'canViewProductRoadmap',
                                'canViewServiceRequest',
                              ].includes(key)
                                ? 'error'
                                : 'success'
                            }
                            size='small'
                            variant='filled'
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Configuration;
