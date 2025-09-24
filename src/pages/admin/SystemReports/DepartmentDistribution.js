import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

const DepartmentDistribution = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Department Distribution
        </Typography>
        <PieChart
          series={[
            {
              data: data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: 'gray',
              },
            },
          ]}
          height={300}
        />
      </CardContent>
    </Card>
  );
};

export default DepartmentDistribution;
