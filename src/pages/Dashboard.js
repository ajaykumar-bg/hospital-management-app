import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as DoctorIcon,
  EventNote as AppointmentIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { useUser } from '../context/UserContext';

const StatCard = ({ title, value, icon, color = 'primary' }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box>
          <Typography color='textSecondary' gutterBottom variant='h6'>
            {title}
          </Typography>
          <Typography variant='h4' component='div'>
            {value}
          </Typography>
        </Box>
        <Box sx={{ color: `${color}.main` }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardMetrics = ({ role }) => {
  const metrics = {
    admin: [
      {
        title: 'Total Patients',
        value: '1,247',
        icon: <PeopleIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Active Doctors',
        value: '34',
        icon: <DoctorIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Today Appointments',
        value: '89',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'warning',
      },
      {
        title: 'Monthly Revenue',
        value: '$127K',
        icon: <TrendingIcon fontSize='large' />,
        color: 'info',
      },
    ],
    staff: [
      {
        title: 'Pending Tasks',
        value: '12',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'warning',
      },
      {
        title: 'Completed Today',
        value: '28',
        icon: <TrendingIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Total Patients',
        value: '1,247',
        icon: <PeopleIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Appointments',
        value: '89',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'info',
      },
    ],
    doctor: [
      {
        title: 'My Patients',
        value: '156',
        icon: <PeopleIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Today Appointments',
        value: '12',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'warning',
      },
      {
        title: 'Completed Visits',
        value: '8',
        icon: <TrendingIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Pending Reviews',
        value: '4',
        icon: <DoctorIcon fontSize='large' />,
        color: 'info',
      },
    ],
    nurse: [
      {
        title: 'Assigned Patients',
        value: '23',
        icon: <PeopleIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Tasks Today',
        value: '15',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'warning',
      },
      {
        title: 'Completed Tasks',
        value: '11',
        icon: <TrendingIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Medications Due',
        value: '7',
        icon: <DoctorIcon fontSize='large' />,
        color: 'error',
      },
    ],
    patient: [
      {
        title: 'Upcoming Appointments',
        value: '2',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Prescriptions',
        value: '3',
        icon: <DoctorIcon fontSize='large' />,
        color: 'info',
      },
      {
        title: 'Test Results',
        value: '1',
        icon: <TrendingIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Bills Pending',
        value: '1',
        icon: <PeopleIcon fontSize='large' />,
        color: 'warning',
      },
    ],
  };

  return metrics[role] || metrics.patient;
};

export default function Dashboard() {
  const { user } = useUser();
  const metrics = DashboardMetrics({ role: user.role });

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
      </Typography>
      <Typography variant='subtitle1' color='textSecondary' gutterBottom>
        Welcome back, {user.name}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...metric} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Performance Overview
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant='body2' color='textSecondary'>
                Patient Satisfaction
              </Typography>
              <LinearProgress variant='determinate' value={87} sx={{ mt: 1 }} />
              <Typography variant='caption' color='textSecondary'>
                87%
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant='body2' color='textSecondary'>
                Treatment Success Rate
              </Typography>
              <LinearProgress
                variant='determinate'
                value={94}
                sx={{ mt: 1 }}
                color='success'
              />
              <Typography variant='caption' color='textSecondary'>
                94%
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant='body2' color='textSecondary'>
                Appointment Efficiency
              </Typography>
              <LinearProgress
                variant='determinate'
                value={78}
                sx={{ mt: 1 }}
                color='warning'
              />
              <Typography variant='caption' color='textSecondary'>
                78%
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {user.role === 'admin' && (
                <>
                  <Typography variant='body2'>• Manage Users</Typography>
                  <Typography variant='body2'>• System Reports</Typography>
                  <Typography variant='body2'>• Hospital Settings</Typography>
                </>
              )}
              {user.role === 'doctor' && (
                <>
                  <Typography variant='body2'>
                    • View Patient Records
                  </Typography>
                  <Typography variant='body2'>
                    • Schedule Appointments
                  </Typography>
                  <Typography variant='body2'>• Write Prescriptions</Typography>
                </>
              )}
              {user.role === 'nurse' && (
                <>
                  <Typography variant='body2'>• Patient Care Tasks</Typography>
                  <Typography variant='body2'>• Medication Schedule</Typography>
                  <Typography variant='body2'>• Vital Signs Entry</Typography>
                </>
              )}
              {user.role === 'staff' && (
                <>
                  <Typography variant='body2'>
                    • Appointment Management
                  </Typography>
                  <Typography variant='body2'>
                    • Patient Registration
                  </Typography>
                  <Typography variant='body2'>
                    • Insurance Processing
                  </Typography>
                </>
              )}
              {user.role === 'patient' && (
                <>
                  <Typography variant='body2'>• Book Appointment</Typography>
                  <Typography variant='body2'>• View Test Results</Typography>
                  <Typography variant='body2'>• Pay Bills</Typography>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
