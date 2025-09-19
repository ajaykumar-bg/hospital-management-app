import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const PatientTrendsChart = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Patient & Appointment Trends
        </Typography>
        <LineChart
          width={800}
          height={300}
          xAxis={[
            {
              scaleType: 'point',
              data: data.months,
            },
          ]}
          series={[
            {
              data: data.patients,
              label: 'Patients',
              color: '#8884d8',
            },
            {
              data: data.appointments,
              label: 'Appointments',
              color: '#82ca9d',
            },
          ]}
          grid={{ horizontal: true, vertical: true }}
        />
      </CardContent>
    </Card>
  );
};

export default PatientTrendsChart;
