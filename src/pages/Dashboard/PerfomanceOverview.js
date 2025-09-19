import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';

function PerformanceOverview() {
  return (
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
  );
}

export default PerformanceOverview;
