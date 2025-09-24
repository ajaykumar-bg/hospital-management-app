import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const FinancialOverview = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Financial Overview
        </Typography>
        <BarChart
          width={1000}
          height={300}
          xAxis={[
            {
              scaleType: 'band',
              data: data.months,
            },
          ]}
          series={[
            {
              data: data.revenue,
              label: 'Revenue',
              color: '#8884d8',
            },
            {
              data: data.expenses,
              label: 'Expenses',
              color: '#82ca9d',
            },
          ]}
          grid={{ horizontal: true }}
        />
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
