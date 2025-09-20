import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { useUser } from '../../context/UserContext';
import { StatCard } from './StatCard';
import { DashboardMetrics } from './DashboardMetrics';
import QuickActions from './QuickActions';
import PerformanceOverview from './PerfomanceOverview';

// Import individual chart components
import {
  DoctorPatientTrends,
  DoctorAppointmentTypes,
  DoctorTreatmentSuccess,
  NurseVitalSigns,
  NurseMedicationSchedule,
  NursePatientCare,
  AdminHospitalAnalytics,
  AdminDepartmentStats,
  AdminUserDistribution,
  StaffAppointmentFlow,
  StaffRegistrationTrends,
  StaffWorkloadDistribution,
  PatientHealthTrends,
  PatientAppointmentHistory,
  PatientHealthMetrics,
} from './RoleSpecificCharts';

export default function Dashboard() {
  const { user } = useUser();
  const metrics = DashboardMetrics({ role: user.role });

  // Get role-specific charts as individual components
  const getRoleSpecificCharts = () => {
    switch (user.role) {
      case 'doctor':
        return {
          chart1: <DoctorPatientTrends />,
          chart2: <DoctorAppointmentTypes />,
          chart3: <DoctorTreatmentSuccess />,
        };
      case 'nurse':
        return {
          chart1: <NurseVitalSigns />,
          chart2: <NurseMedicationSchedule />,
          chart3: <NursePatientCare />,
        };
      case 'admin':
        return {
          chart1: <AdminHospitalAnalytics />,
          chart2: <AdminDepartmentStats />,
          chart3: <AdminUserDistribution />,
        };
      case 'staff':
        return {
          chart1: <StaffAppointmentFlow />,
          chart2: <StaffRegistrationTrends />,
          chart3: <StaffWorkloadDistribution />,
        };
      case 'patient':
        return {
          chart1: <PatientHealthTrends />,
          chart2: <PatientAppointmentHistory />,
          chart3: <PatientHealthMetrics />,
        };
      default:
        return {
          chart1: <PatientHealthTrends />,
          chart2: <PatientAppointmentHistory />,
          chart3: <PatientHealthMetrics />,
        };
    }
  };

  const charts = getRoleSpecificCharts();

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
      </Typography>
      <Typography variant='subtitle1' color='textSecondary' gutterBottom>
        Welcome back, {user.name}
      </Typography>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {metrics.map((metric, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatCard {...metric} />
          </Grid>
        ))}
      </Grid>

      {/* Main Dashboard Content */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <PerformanceOverview />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <QuickActions user={user} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>{charts.chart1}</Grid>
      </Grid>

      {/* Additional Charts Row */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>{charts.chart2}</Grid>

        <Grid size={{ xs: 12, md: 6 }}>{charts.chart3}</Grid>
      </Grid>
    </Box>
  );
}
