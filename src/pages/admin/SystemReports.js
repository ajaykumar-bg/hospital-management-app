import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

const mockData = {
  patientStats: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    patients: [1200, 1350, 1280, 1420, 1380, 1500],
    appointments: [2400, 2700, 2560, 2840, 2760, 3000],
  },
  departmentData: [
    { id: 0, value: 30, label: 'Cardiology' },
    { id: 1, value: 25, label: 'Emergency' },
    { id: 2, value: 20, label: 'Pediatrics' },
    { id: 3, value: 15, label: 'Orthopedics' },
    { id: 4, value: 10, label: 'Others' },
  ],
  revenue: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue: [125000, 138000, 142000, 155000, 148000, 162000],
    expenses: [98000, 105000, 108000, 112000, 109000, 115000],
  },
};

export default function SystemReports() {
  const [reportType, setReportType] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');

  const exportReport = (type) => {
    console.log(`Exporting ${type} report for ${timeRange}`);
    // Implementation for export functionality
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        System Reports
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                label='Report Type'
              >
                <MenuItem value='overview'>Overview</MenuItem>
                <MenuItem value='financial'>Financial</MenuItem>
                <MenuItem value='operational'>Operational</MenuItem>
                <MenuItem value='patient'>Patient Analytics</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label='Time Range'
              >
                <MenuItem value='1month'>Last Month</MenuItem>
                <MenuItem value='3months'>Last 3 Months</MenuItem>
                <MenuItem value='6months'>Last 6 Months</MenuItem>
                <MenuItem value='1year'>Last Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant='contained'
              onClick={() => exportReport(reportType)}
              fullWidth
            >
              Export Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Patient Statistics */}
        <Grid item xs={12} lg={8}>
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
                    data: mockData.patientStats.months,
                  },
                ]}
                series={[
                  {
                    data: mockData.patientStats.patients,
                    label: 'Patients',
                    color: '#8884d8',
                  },
                  {
                    data: mockData.patientStats.appointments,
                    label: 'Appointments',
                    color: '#82ca9d',
                  },
                ]}
                grid={{ horizontal: true, vertical: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Department Distribution */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Department Distribution
              </Typography>
              <PieChart
                series={[
                  {
                    data: mockData.departmentData,
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
        </Grid>

        {/* Revenue Report */}
        <Grid item xs={12}>
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
                    data: mockData.revenue.months,
                  },
                ]}
                series={[
                  {
                    data: mockData.revenue.revenue,
                    label: 'Revenue',
                    color: '#8884d8',
                  },
                  {
                    data: mockData.revenue.expenses,
                    label: 'Expenses',
                    color: '#82ca9d',
                  },
                ]}
                grid={{ horizontal: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='primary'>
                Total Patients
              </Typography>
              <Typography variant='h4'>8,130</Typography>
              <Typography variant='body2' color='textSecondary'>
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='success.main'>
                Revenue (YTD)
              </Typography>
              <Typography variant='h4'>$970K</Typography>
              <Typography variant='body2' color='textSecondary'>
                +8% from last year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='warning.main'>
                Active Staff
              </Typography>
              <Typography variant='h4'>234</Typography>
              <Typography variant='body2' color='textSecondary'>
                +5 new hires
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='error.main'>
                Bed Occupancy
              </Typography>
              <Typography variant='h4'>87%</Typography>
              <Typography variant='body2' color='textSecondary'>
                -3% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
