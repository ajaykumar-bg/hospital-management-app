import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Assignment as ReportIcon,
  GetApp as DownloadIcon,
  Visibility as ViewIcon,
  LocalHospital as TestIcon,
  Science as LabIcon,
  MonitorHeart as VitalIcon,
} from '@mui/icons-material';

const mockTestResults = [
  {
    id: 1,
    testName: 'Complete Blood Count (CBC)',
    date: '2024-09-20',
    status: 'Completed',
    results: {
      'White Blood Cells': '7.2 K/uL',
      'Red Blood Cells': '4.8 M/uL',
      Hemoglobin: '14.2 g/dL',
      Hematocrit: '42.1%',
      Platelets: '285 K/uL',
    },
    normalRanges: {
      'White Blood Cells': '4.0-11.0 K/uL',
      'Red Blood Cells': '4.2-5.4 M/uL',
      Hemoglobin: '12.0-16.0 g/dL',
      Hematocrit: '36-46%',
      Platelets: '150-450 K/uL',
    },
    doctorNotes:
      'All values within normal range. Continue current health regimen.',
  },
  {
    id: 2,
    testName: 'Lipid Panel',
    date: '2024-09-15',
    status: 'Completed',
    results: {
      'Total Cholesterol': '195 mg/dL',
      'HDL Cholesterol': '55 mg/dL',
      'LDL Cholesterol': '125 mg/dL',
      Triglycerides: '140 mg/dL',
    },
    normalRanges: {
      'Total Cholesterol': '<200 mg/dL',
      'HDL Cholesterol': '>40 mg/dL',
      'LDL Cholesterol': '<100 mg/dL',
      Triglycerides: '<150 mg/dL',
    },
    doctorNotes:
      'LDL slightly elevated. Recommend dietary modifications and follow-up in 3 months.',
  },
  {
    id: 3,
    testName: 'Thyroid Function Tests',
    date: '2024-09-10',
    status: 'Pending',
    results: null,
    normalRanges: {
      TSH: '0.4-4.0 mIU/L',
      T4: '4.5-12.0 ug/dL',
      T3: '80-200 ng/dL',
    },
    doctorNotes: 'Results expected by September 25th.',
  },
];

const mockImagingResults = [
  {
    id: 1,
    testName: 'Chest X-Ray',
    date: '2024-09-18',
    status: 'Completed',
    findings: 'Clear lung fields. Normal heart size. No acute abnormalities.',
    doctorNotes: 'Routine screening - normal results.',
  },
  {
    id: 2,
    testName: 'Abdominal Ultrasound',
    date: '2024-09-12',
    status: 'Completed',
    findings:
      'Normal liver, gallbladder, and kidneys. No masses or fluid collections.',
    doctorNotes: 'Follow-up not required at this time.',
  },
];

export default function ViewTestResults() {
  const [selectedResult, setSelectedResult] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleViewDetails = (result) => {
    setSelectedResult(result);
    setOpenDialog(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'success',
      Pending: 'warning',
      'In Progress': 'info',
    };
    return colors[status] || 'default';
  };

  const isValueNormal = (value, range) => {
    // Simple check for demo purposes
    return true; // In real app, would parse and compare values
  };

  const handleDownload = (result) => {
    // Simulate PDF download
    console.log('Downloading report for:', result.testName);
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Test Results
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1}>
                <TestIcon color='primary' />
                <Typography variant='h6'>Total Tests</Typography>
              </Box>
              <Typography variant='h4'>
                {mockTestResults.length + mockImagingResults.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1}>
                <LabIcon color='success' />
                <Typography variant='h6'>Completed</Typography>
              </Box>
              <Typography variant='h4'>
                {
                  [...mockTestResults, ...mockImagingResults].filter(
                    (t) => t.status === 'Completed'
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1}>
                <VitalIcon color='warning' />
                <Typography variant='h6'>Pending</Typography>
              </Box>
              <Typography variant='h4'>
                {
                  [...mockTestResults, ...mockImagingResults].filter(
                    (t) => t.status === 'Pending'
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Laboratory Tests */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Laboratory Tests
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockTestResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.testName}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={result.status}
                        color={getStatusColor(result.status)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleViewDetails(result)}
                        disabled={result.status === 'Pending'}
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDownload(result)}
                        disabled={result.status === 'Pending'}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Imaging Results */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Imaging Results
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Findings</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockImagingResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.testName}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={result.status}
                        color={getStatusColor(result.status)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' noWrap sx={{ maxWidth: 200 }}>
                        {result.findings}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDownload(result)}>
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Results Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          <Box display='flex' alignItems='center' gap={1}>
            <ReportIcon />
            {selectedResult?.testName} - Results
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedResult && selectedResult.results && (
            <Box>
              <Typography variant='body2' color='textSecondary' gutterBottom>
                Test Date: {selectedResult.date}
              </Typography>

              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant='h6' gutterBottom>
                  Results
                </Typography>
                <List>
                  {Object.entries(selectedResult.results).map(
                    ([key, value]) => (
                      <React.Fragment key={key}>
                        <ListItem>
                          <ListItemText
                            primary={key}
                            secondary={`Normal Range: ${selectedResult.normalRanges[key]}`}
                          />
                          <Typography
                            variant='body1'
                            fontWeight='bold'
                            color={
                              isValueNormal(
                                value,
                                selectedResult.normalRanges[key]
                              )
                                ? 'success.main'
                                : 'error.main'
                            }
                          >
                            {value}
                          </Typography>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    )
                  )}
                </List>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom>
                  Doctor's Notes
                </Typography>
                <Typography variant='body1'>
                  {selectedResult.doctorNotes}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button
            variant='contained'
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload(selectedResult)}
          >
            Download Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
