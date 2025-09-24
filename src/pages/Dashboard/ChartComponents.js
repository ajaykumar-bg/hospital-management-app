import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import {
  LineChart as MuiLineChart,
  BarChart as MuiBarChart,
  PieChart as MuiPieChart,
} from '@mui/x-charts';

// MUI X-Charts Line Chart Component
export const LineChart = ({ title, data, color = '#2196f3', height = 200 }) => {
  // Transform data for MUI X-Charts format
  const xAxisData = data.map((d) => d.label);
  const seriesData = data.map((d) => d.value);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: height, mt: 2 }}>
        <MuiLineChart
          xAxis={[
            {
              data: xAxisData,
              scaleType: 'point',
            },
          ]}
          series={[
            {
              data: seriesData,
              color: color,
              area: true,
            },
          ]}
          height={height}
          margin={{ left: 60, right: 60, top: 20, bottom: 60 }}
        />
      </Box>
    </Paper>
  );
};

// MUI X-Charts Bar Chart Component
export const BarChart = ({ title, data, color = '#4caf50', height = 300 }) => {
  // Transform data for MUI X-Charts format
  const xAxisData = data.map((d) => d.label);
  const seriesData = data.map((d) => d.value);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: height, mt: 2 }}>
        <MuiBarChart
          xAxis={[
            {
              data: xAxisData,
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: seriesData,
              color: color,
            },
          ]}
          height={height}
          margin={{ left: 60, right: 60, top: 20, bottom: 60 }}
        />
      </Box>
    </Paper>
  );
};

// MUI X-Charts Pie Chart Component (replacing DonutChart)
export const DonutChart = ({ title, data, centerLabel }) => {
  // Transform data for MUI X-Charts PieChart format
  const pieData = data.map((item, index) => ({
    id: index,
    value: item.value,
    label: item.label,
    color: ['#2196f3', '#4caf50', '#ff9800', '#f44336', '#9c27b0', '#00bcd4'][
      index % 6
    ],
  }));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: 300, mt: 2 }}>
        <MuiPieChart
          series={[
            {
              data: pieData,
              innerRadius: 40,
              outerRadius: 80,
              paddingAngle: 2,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 270,
              cx: 150,
              cy: 150,
            },
          ]}
          height={300}
          slotProps={{
            legend: {
              direction: 'horizontal',
              position: { vertical: 'middle', horizontal: 'center' },
              padding: 0,
            },
          }}
        />
        {centerLabel && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '30%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <Typography variant='h6' fontWeight='bold'>
              {centerLabel}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
