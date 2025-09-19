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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const mockData = {
  patientStats: [
    { month: 'Jan', patients: 1200, appointments: 2400 },
    { month: 'Feb', patients: 1350, appointments: 2700 },
    { month: 'Mar', patients: 1280, appointments: 2560 },
    { month: 'Apr', patients: 1420, appointments: 2840 },
    { month: 'May', patients: 1380, appointments: 2760 },
    { month: 'Jun', patients: 1500, appointments: 3000 },
  ],
  departmentData: [
    { name: 'Cardiology', value: 30, patients: 450 },
    { name: 'Emergency', value: 25, patients: 375 },
    { name: 'Pediatrics', value: 20, patients: 300 },
    { name: 'Orthopedics', value: 15, patients: 225 },
    { name: 'Others', value: 10, patients: 150 },
  ],
  revenue: [
    { month: 'Jan', revenue: 125000, expenses: 98000 },
    { month: 'Feb', revenue: 138000, expenses: 105000 },
    { month: 'Mar', revenue: 142000, expenses: 108000 },
    { month: 'Apr', revenue: 155000, expenses: 112000 },
    { month: 'May', revenue: 148000, expenses: 109000 },
    { month: 'Jun', revenue: 162000, expenses: 115000 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={mockData.patientStats}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='patients' stroke='#8884d8' />
                  <Line
                    type='monotone'
                    dataKey='appointments'
                    stroke='#82ca9d'
                  />
                </LineChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={mockData.departmentData}
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label
                  >
                    {mockData.departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={mockData.revenue}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='revenue' fill='#8884d8' />
                  <Bar dataKey='expenses' fill='#82ca9d' />
                </BarChart>
              </ResponsiveContainer>
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
