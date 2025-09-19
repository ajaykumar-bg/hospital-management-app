import React from 'react';
import { Card, CardContent, Grid, Typography, Box, Chip } from '@mui/material';

const SystemStatus = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          System Status
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box textAlign='center'>
              <Typography variant='body2' color='textSecondary'>
                Database
              </Typography>
              <Chip label='Online' color='success' />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box textAlign='center'>
              <Typography variant='body2' color='textSecondary'>
                API Services
              </Typography>
              <Chip label='Online' color='success' />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box textAlign='center'>
              <Typography variant='body2' color='textSecondary'>
                Backup System
              </Typography>
              <Chip label='Online' color='success' />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box textAlign='center'>
              <Typography variant='body2' color='textSecondary'>
                Email Service
              </Typography>
              <Chip label='Warning' color='warning' />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
