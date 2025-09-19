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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  LocalHospital as DoctorIcon,
  MedicalServices as NurseIcon,
  Business as StaffIcon,
  PersonOutline as PatientIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';

const Configuration = () => {
  const { user, permissions, switchRole } = useUser();

  const permissionLabels = {
    canManageUsers: 'Manage Users',
    canViewAllPatients: 'View All Patients',
    canManageSystem: 'System Management',
    canViewReports: 'View Reports',
    canManageAppointments: 'Manage Appointments',
  };

  const roleConfig = {
    admin: { color: 'error', icon: <AdminIcon /> },
    staff: { color: 'info', icon: <StaffIcon /> },
    doctor: { color: 'success', icon: <DoctorIcon /> },
    nurse: { color: 'primary', icon: <NurseIcon /> },
    patient: { color: 'secondary', icon: <PatientIcon /> },
  };

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
  };

  // Define all role permissions for comparison
  const allRolePermissions = {
    admin: {
      canManageUsers: true,
      canViewAllPatients: true,
      canManageSystem: true,
      canViewReports: true,
      canManageAppointments: true,
    },
    staff: {
      canManageUsers: false,
      canViewAllPatients: true,
      canManageSystem: false,
      canViewReports: true,
      canManageAppointments: true,
    },
    doctor: {
      canManageUsers: false,
      canViewAllPatients: true,
      canManageSystem: false,
      canViewReports: true,
      canManageAppointments: true,
    },
    nurse: {
      canManageUsers: false,
      canViewAllPatients: true,
      canManageSystem: false,
      canViewReports: false,
      canManageAppointments: true,
    },
    patient: {
      canManageUsers: false,
      canViewAllPatients: false,
      canManageSystem: false,
      canViewReports: false,
      canManageAppointments: false,
    },
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
        </Grid>

        {/* Role Switching */}
        <Grid size={{ xs: 12, md: 6 }}>
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
                Role changes take effect immediately and will update the
                navigation menu and dashboard content.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Permissions */}
        <Grid size={{ xs: 12 }}>
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
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
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
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Comparison
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Compare permissions between different hospital roles
              </Typography>

              <TableContainer component={Paper} variant='outlined'>
                <Table size='small' sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Permission</TableCell>
                      <TableCell align='center'>Admin</TableCell>
                      <TableCell align='center'>Staff</TableCell>
                      <TableCell align='center'>Doctor</TableCell>
                      <TableCell align='center'>Nurse</TableCell>
                      <TableCell align='center'>Patient</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(permissionLabels).map((key) => (
                      <TableRow key={key} hover>
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{ fontWeight: 500 }}
                        >
                          {permissionLabels[key]}
                        </TableCell>
                        {['admin', 'staff', 'doctor', 'nurse', 'patient'].map(
                          (role) => (
                            <TableCell align='center' key={role}>
                              <Chip
                                label={
                                  allRolePermissions[role][key] ? '✓' : '✗'
                                }
                                color={
                                  allRolePermissions[role][key]
                                    ? 'success'
                                    : 'error'
                                }
                                size='small'
                                variant='filled'
                                sx={{ minWidth: 32 }}
                              />
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Configuration;
