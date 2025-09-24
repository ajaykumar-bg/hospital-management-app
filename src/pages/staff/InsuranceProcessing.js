import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Security as InsuranceIcon,
  Receipt as ClaimIcon,
  CheckCircle as ApprovedIcon,
  HourglassEmpty as PendingIcon,
  Cancel as DeniedIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

const mockInsuranceClaims = [
  {
    id: 1,
    claimNumber: 'CLM-2024-001',
    patientName: 'John Smith',
    patientId: 'P001',
    insuranceProvider: 'HealthCare Plus',
    policyNumber: 'HCP123456789',
    serviceDate: '2024-09-15',
    serviceType: 'Routine Checkup',
    claimedAmount: 250.0,
    approvedAmount: 200.0,
    status: 'Approved',
    submissionDate: '2024-09-16',
    processedDate: '2024-09-20',
    notes: 'Routine preventive care covered at 80%',
  },
  {
    id: 2,
    claimNumber: 'CLM-2024-002',
    patientName: 'Mary Davis',
    patientId: 'P002',
    insuranceProvider: 'BlueCross Shield',
    policyNumber: 'BCS987654321',
    serviceDate: '2024-09-18',
    serviceType: 'Blood Test & Laboratory',
    claimedAmount: 180.5,
    approvedAmount: null,
    status: 'Pending',
    submissionDate: '2024-09-19',
    processedDate: null,
    notes: 'Under review by insurance provider',
  },
  {
    id: 3,
    claimNumber: 'CLM-2024-003',
    patientName: 'Robert Wilson',
    patientId: 'P003',
    insuranceProvider: 'Medicare',
    policyNumber: 'MED456789123',
    serviceDate: '2024-09-10',
    serviceType: 'Prescription Medications',
    claimedAmount: 95.75,
    approvedAmount: 0.0,
    status: 'Denied',
    submissionDate: '2024-09-11',
    processedDate: '2024-09-14',
    notes: 'Medication not covered under current plan',
  },
];

const insuranceProviders = [
  'HealthCare Plus',
  'BlueCross Shield',
  'Medicare',
  'Medicaid',
  'Aetna',
  'Cigna',
  'United Healthcare',
];

const serviceTypes = [
  'Routine Checkup',
  'Emergency Visit',
  'Consultation',
  'Blood Test & Laboratory',
  'Prescription Medications',
  'Imaging Services',
  'Surgical Procedures',
  'Physical Therapy',
];

export default function InsuranceProcessing() {
  const [claims, setClaims] = useState(mockInsuranceClaims);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claimForm, setClaimForm] = useState({
    patientName: '',
    patientId: '',
    insuranceProvider: '',
    policyNumber: '',
    serviceDate: '',
    serviceType: '',
    claimedAmount: '',
    notes: '',
  });

  const handleOpenDialog = (claim = null) => {
    if (claim) {
      setSelectedClaim(claim);
      setClaimForm({
        patientName: claim.patientName,
        patientId: claim.patientId,
        insuranceProvider: claim.insuranceProvider,
        policyNumber: claim.policyNumber,
        serviceDate: claim.serviceDate,
        serviceType: claim.serviceType,
        claimedAmount: claim.claimedAmount,
        notes: claim.notes,
      });
    } else {
      setSelectedClaim(null);
      setClaimForm({
        patientName: '',
        patientId: '',
        insuranceProvider: '',
        policyNumber: '',
        serviceDate: '',
        serviceType: '',
        claimedAmount: '',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const generateClaimNumber = () => {
    const year = new Date().getFullYear();
    const maxId = Math.max(
      ...claims.map((c) => parseInt(c.claimNumber.split('-')[2]))
    );
    return `CLM-${year}-${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleSubmitClaim = () => {
    const claimData = {
      ...claimForm,
      claimedAmount: parseFloat(claimForm.claimedAmount),
      status: 'Pending',
      submissionDate: new Date().toISOString().split('T')[0],
      processedDate: null,
      approvedAmount: null,
    };

    if (selectedClaim) {
      setClaims(
        claims.map((claim) =>
          claim.id === selectedClaim.id ? { ...claim, ...claimData } : claim
        )
      );
    } else {
      const newClaim = {
        id: Math.max(...claims.map((c) => c.id)) + 1,
        claimNumber: generateClaimNumber(),
        ...claimData,
      };
      setClaims([...claims, newClaim]);
    }

    setOpenDialog(false);
  };

  const handleUpdateStatus = (id, status, approvedAmount = null) => {
    setClaims(
      claims.map((claim) =>
        claim.id === id
          ? {
              ...claim,
              status,
              approvedAmount,
              processedDate: new Date().toISOString().split('T')[0],
            }
          : claim
      )
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      Approved: 'success',
      Pending: 'warning',
      Denied: 'error',
      Processing: 'info',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      Approved: <ApprovedIcon />,
      Pending: <PendingIcon />,
      Denied: <DeniedIcon />,
    };
    return icons[status] || <PendingIcon />;
  };

  const totalClaimed = claims.reduce(
    (sum, claim) => sum + claim.claimedAmount,
    0
  );
  const totalApproved = claims.reduce(
    (sum, claim) => sum + (claim.approvedAmount || 0),
    0
  );
  const pendingClaims = claims.filter(
    (claim) => claim.status === 'Pending'
  ).length;

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Insurance Processing
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <ClaimIcon color='primary' />
                <Typography variant='h6'>Total Claims</Typography>
              </Box>
              <Typography variant='h4'>{claims.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <PendingIcon color='warning' />
                <Typography variant='h6'>Pending</Typography>
              </Box>
              <Typography variant='h4'>{pendingClaims}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <InsuranceIcon color='info' />
                <Typography variant='h6'>Total Claimed</Typography>
              </Box>
              <Typography variant='h4'>${totalClaimed.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <ApprovedIcon color='success' />
                <Typography variant='h6'>Total Approved</Typography>
              </Box>
              <Typography variant='h4'>${totalApproved.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Recent Claims Status
              </Typography>
              <List dense>
                {claims.slice(0, 3).map((claim) => (
                  <React.Fragment key={claim.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${claim.claimNumber} - ${claim.patientName}`}
                        secondary={`${
                          claim.serviceType
                        } - $${claim.claimedAmount.toFixed(2)}`}
                      />
                      <Box display='flex' alignItems='center' gap={1}>
                        {getStatusIcon(claim.status)}
                        <Chip
                          label={claim.status}
                          color={getStatusColor(claim.status)}
                          size='small'
                        />
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Quick Actions
              </Typography>
              <Button
                variant='contained'
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{ mb: 2 }}
              >
                Submit New Claim
              </Button>
              <Paper sx={{ p: 2 }}>
                <Typography variant='body2' color='textSecondary'>
                  Processing Time: 3-5 business days
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Approval Rate: 85%
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Claims Table */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            All Insurance Claims
          </Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Claim Number</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Insurance</TableCell>
                  <TableCell>Service Date</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Claimed Amount</TableCell>
                  <TableCell>Approved Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell>
                      <Typography variant='body2' fontWeight='bold'>
                        {claim.claimNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2' fontWeight='bold'>
                          {claim.patientName}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          ID: {claim.patientId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2'>
                          {claim.insuranceProvider}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          {claim.policyNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{claim.serviceDate}</TableCell>
                    <TableCell>{claim.serviceType}</TableCell>
                    <TableCell>${claim.claimedAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      {claim.approvedAmount !== null
                        ? `$${claim.approvedAmount.toFixed(2)}`
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={claim.status}
                        color={getStatusColor(claim.status)}
                        size='small'
                        icon={getStatusIcon(claim.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display='flex' gap={1}>
                        <Button
                          size='small'
                          startIcon={<ViewIcon />}
                          onClick={() => handleOpenDialog(claim)}
                        >
                          View
                        </Button>
                        {claim.status === 'Pending' && (
                          <>
                            <Button
                              size='small'
                              color='success'
                              onClick={() =>
                                handleUpdateStatus(
                                  claim.id,
                                  'Approved',
                                  claim.claimedAmount * 0.8
                                )
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              size='small'
                              color='error'
                              onClick={() =>
                                handleUpdateStatus(claim.id, 'Denied', 0)
                              }
                            >
                              Deny
                            </Button>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Claim Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          {selectedClaim
            ? 'View/Edit Insurance Claim'
            : 'Submit New Insurance Claim'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Patient Name'
                value={claimForm.patientName}
                onChange={(e) =>
                  setClaimForm({ ...claimForm, patientName: e.target.value })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Patient ID'
                value={claimForm.patientId}
                onChange={(e) =>
                  setClaimForm({ ...claimForm, patientId: e.target.value })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Insurance Provider</InputLabel>
                <Select
                  value={claimForm.insuranceProvider}
                  onChange={(e) =>
                    setClaimForm({
                      ...claimForm,
                      insuranceProvider: e.target.value,
                    })
                  }
                  label='Insurance Provider'
                >
                  {insuranceProviders.map((provider) => (
                    <MenuItem key={provider} value={provider}>
                      {provider}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Policy Number'
                value={claimForm.policyNumber}
                onChange={(e) =>
                  setClaimForm({ ...claimForm, policyNumber: e.target.value })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Service Date'
                type='date'
                value={claimForm.serviceDate}
                onChange={(e) =>
                  setClaimForm({ ...claimForm, serviceDate: e.target.value })
                }
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={claimForm.serviceType}
                  onChange={(e) =>
                    setClaimForm({ ...claimForm, serviceType: e.target.value })
                  }
                  label='Service Type'
                >
                  {serviceTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Claimed Amount'
                type='number'
                value={claimForm.claimedAmount}
                onChange={(e) =>
                  setClaimForm({ ...claimForm, claimedAmount: e.target.value })
                }
                fullWidth
                required
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label='Notes'
                value={claimForm.notes}
                onChange={(e) =>
                  setClaimForm({ ...claimForm, notes: e.target.value })
                }
                multiline
                rows={3}
                fullWidth
                placeholder='Additional notes or comments about the claim...'
              />
            </Grid>
            {selectedClaim && (
              <Grid size={{ xs: 12 }}>
                <Alert severity='info'>
                  <Typography variant='body2'>
                    <strong>Submission Date:</strong>{' '}
                    {selectedClaim.submissionDate}
                    <br />
                    <strong>Status:</strong> {selectedClaim.status}
                    <br />
                    {selectedClaim.processedDate && (
                      <>
                        <strong>Processed Date:</strong>{' '}
                        {selectedClaim.processedDate}
                        <br />
                      </>
                    )}
                    {selectedClaim.approvedAmount !== null && (
                      <>
                        <strong>Approved Amount:</strong> $
                        {selectedClaim.approvedAmount.toFixed(2)}
                      </>
                    )}
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitClaim}
            variant='contained'
            disabled={
              !claimForm.patientName ||
              !claimForm.insuranceProvider ||
              !claimForm.serviceDate ||
              !claimForm.claimedAmount
            }
          >
            {selectedClaim ? 'Update' : 'Submit'} Claim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
