import React from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const ReportFilters = ({
  reportType,
  timeRange,
  onReportTypeChange,
  onTimeRangeChange,
  onExportReport,
}) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3} alignItems='center'>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Report Type</InputLabel>
            <Select
              value={reportType}
              onChange={(e) => onReportTypeChange(e.target.value)}
              label='Report Type'
            >
              <MenuItem value='overview'>Overview</MenuItem>
              <MenuItem value='financial'>Financial</MenuItem>
              <MenuItem value='operational'>Operational</MenuItem>
              <MenuItem value='patient'>Patient Analytics</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              label='Time Range'
            >
              <MenuItem value='1month'>Last Month</MenuItem>
              <MenuItem value='3months'>Last 3 Months</MenuItem>
              <MenuItem value='6months'>Last 6 Months</MenuItem>
              <MenuItem value='1year'>Last Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant='contained'
            onClick={() => onExportReport(reportType)}
            fullWidth
          >
            Export Report
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReportFilters;
