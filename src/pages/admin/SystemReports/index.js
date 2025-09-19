import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ReportFilters from './ReportFilters';
import PatientTrendsChart from './PatientTrendsChart';
import DepartmentChart from './DepartmentChart';
import FinancialChart from './FinancialChart';
import SummaryCards from './SummaryCards';
import { mockData } from './constants';

export default function SystemReports() {
  const [reportType, setReportType] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');

  const exportReport = (type) => {
    console.log(`Exporting ${type} report for ${timeRange}`);
    // Implementation for export functionality
  };

  const handleReportTypeChange = (newType) => {
    setReportType(newType);
  };

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        System Reports
      </Typography>

      <ReportFilters
        reportType={reportType}
        timeRange={timeRange}
        onReportTypeChange={handleReportTypeChange}
        onTimeRangeChange={handleTimeRangeChange}
        onExportReport={exportReport}
      />

      <Grid container spacing={3}>
        {/* Patient Statistics */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <PatientTrendsChart data={mockData.patientStats} />
        </Grid>

        {/* Department Distribution */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <DepartmentChart data={mockData.departmentData} />
        </Grid>

        {/* Revenue Report */}
        <Grid size={{ xs: 12 }}>
          <FinancialChart data={mockData.revenue} />
        </Grid>

        {/* Summary Cards */}
        <SummaryCards />
      </Grid>
    </Box>
  );
}
