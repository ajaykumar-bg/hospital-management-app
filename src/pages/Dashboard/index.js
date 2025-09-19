import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { useUser } from '../../context/UserContext';
import { StatCard } from './StatCard';
import { DashboardMetrics } from './DashboardMetrics';
import QuickActions from './QuickActions';
import PerformanceOverview from './PerfomanceOverview';

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
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatCard {...metric} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <PerformanceOverview />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <QuickActions user={user} />
        </Grid>
      </Grid>
    </Box>
  );
}
