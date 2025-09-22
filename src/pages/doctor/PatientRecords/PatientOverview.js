import React from 'react';
import { Grid, Card, CardContent, Typography, Chip } from '@mui/material';
import { getStatusColor } from './constants';

const PatientOverview = ({ patient }) => {
  if (!patient) return null;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Patient Information
            </Typography>
            <Typography>
              <strong>Age:</strong> {patient.age}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {patient.gender}
            </Typography>
            <Typography>
              <strong>Room:</strong> {patient.room}
            </Typography>
            <Typography>
              <strong>Condition:</strong> {patient.condition}
            </Typography>
            <Typography>
              <strong>Status:</strong>
              <Chip
                label={patient.status}
                color={getStatusColor(patient.status)}
                size='small'
                sx={{ ml: 1 }}
              />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Current Vitals
            </Typography>
            <Typography>
              <strong>Blood Pressure:</strong> {patient.vitals.bp}
            </Typography>
            <Typography>
              <strong>Pulse:</strong> {patient.vitals.pulse} bpm
            </Typography>
            <Typography>
              <strong>Temperature:</strong> {patient.vitals.temp}
            </Typography>
            <Typography>
              <strong>Weight:</strong> {patient.vitals.weight}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PatientOverview;
