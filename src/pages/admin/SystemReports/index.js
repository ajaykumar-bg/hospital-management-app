import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SystemReportFilters from './SystemReportFilters';
import PatientAppointmentTrends from './PatientAppointmentTrends';
import DepartmentDistribution from './DepartmentDistribution';
import FinancialOverview from './FinancialOverview';
import SystemReportSummaryCards from './SystemReportSummaryCards';
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

      <SystemReportFilters
        reportType={reportType}
        timeRange={timeRange}
        onReportTypeChange={handleReportTypeChange}
        onTimeRangeChange={handleTimeRangeChange}
        onExportReport={exportReport}
      />

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <SystemReportSummaryCards />

        {/* Patient Statistics */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <PatientAppointmentTrends data={mockData.patientStats} />
        </Grid>

        {/* Department Distribution */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <DepartmentDistribution data={mockData.departmentData} />
        </Grid>

        {/* Revenue Report */}
        <Grid size={{ xs: 12 }}>
          <FinancialOverview data={mockData.revenue} />
        </Grid>
      </Grid>
    </Box>
  );
}
