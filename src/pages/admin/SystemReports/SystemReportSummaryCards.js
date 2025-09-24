import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const SystemReportSummaryCards = () => {
  const summaryData = [
    {
      title: 'Total Patients',
      value: '8,130',
      change: '+12% from last month',
      color: 'primary',
    },
    {
      title: 'Revenue (YTD)',
      value: '$970K',
      change: '+8% from last year',
      color: 'success.main',
    },
    {
      title: 'Active Staff',
      value: '234',
      change: '+5 new hires',
      color: 'warning.main',
    },
    {
      title: 'Bed Occupancy',
      value: '87%',
      change: '-3% from last month',
      color: 'error.main',
    },
  ];

  return (
    <>
      {summaryData.map((item, index) => (
        <Grid size={{ xs: 12, md: 3 }} key={index}>
          <Card>
            <CardContent>
              <Typography variant='h6' color={item.color}>
                {item.title}
              </Typography>
              <Typography variant='h4'>{item.value}</Typography>
              <Typography variant='body2' color='textSecondary'>
                {item.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default SystemReportSummaryCards;
