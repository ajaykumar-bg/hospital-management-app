import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  LinearProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  LocalPharmacy as MedicationIcon,
  CheckCircle as AdministeredIcon,
  Schedule as PendingIcon,
  Warning as OverdueIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const mockMedications = [
  {
    id: 1,
    patientName: 'John Smith',
    room: '201A',
    medication: 'Lisinopril 10mg',
    dosage: '1 tablet',
    route: 'Oral',
    frequency: 'Once daily',
    scheduledTime: '08:00',
    status: 'Pending',
    prescribedBy: 'Dr. Johnson',
    notes: 'Take with food. Monitor blood pressure.',
    allergies: 'None',
  },
  {
    id: 2,
    patientName: 'Sarah Johnson',
    room: '105B',
    medication: 'Metformin 500mg',
    dosage: '2 tablets',
    route: 'Oral',
    frequency: 'Twice daily',
    scheduledTime: '08:30',
    status: 'Administered',
    prescribedBy: 'Dr. Smith',
    notes: 'Take 30 minutes before meals.',
    allergies: 'Penicillin',
    administeredAt: '08:25',
    administeredBy: 'Nurse Williams',
  },
  {
    id: 3,
    patientName: 'Michael Brown',
    room: 'ICU-3',
    medication: 'Morphine 2mg',
    dosage: '1 injection',
    route: 'IV',
    frequency: 'Every 4 hours',
    scheduledTime: '07:00',
    status: 'Overdue',
    prescribedBy: 'Dr. Davis',
    notes: 'Pain management post-surgery. Monitor respiratory rate.',
    allergies: 'Latex',
  },
  {
    id: 4,
    patientName: 'Emily Davis',
    room: '302C',
    medication: 'Insulin Lispro 10 units',
    dosage: '10 units',
    route: 'Subcutaneous',
    frequency: 'Before meals',
    scheduledTime: '12:00',
    status: 'Pending',
    prescribedBy: 'Dr. Wilson',
    notes: 'Administer 15 minutes before lunch. Check blood glucose.',
    allergies: 'None',
  },
  {
    id: 5,
    patientName: 'Robert Taylor',
    room: '204A',
    medication: 'Warfarin 5mg',
    dosage: '1 tablet',
    route: 'Oral',
    frequency: 'Once daily',
    scheduledTime: '18:00',
    status: 'Pending',
    prescribedBy: 'Dr. Anderson',
    notes: 'Monitor PT/INR levels. Avoid vitamin K rich foods.',
    allergies: 'Sulfa drugs',
  },
];

export default function MedicationSchedule() {
  const [medications, setMedications] = useState(mockMedications);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [administrationNotes, setAdministrationNotes] = useState('');

  const handleAdministerMedication = (medicationId) => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    setMedications(
      medications.map((med) =>
        med.id === medicationId
          ? {
              ...med,
              status: 'Administered',
              administeredAt: currentTime,
              administeredBy: 'Current Nurse',
              administrationNotes: administrationNotes,
            }
          : med
      )
    );
    setAdministrationNotes('');
  };

  const handleViewMedication = (medication) => {
    setSelectedMedication(medication);
    setOpenDialog(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'warning',
      Administered: 'success',
      Overdue: 'error',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      Pending: <PendingIcon />,
      Administered: <AdministeredIcon />,
      Overdue: <OverdueIcon />,
    };
    return icons[status] || <MedicationIcon />;
  };

  const getPriorityLevel = (status, scheduledTime) => {
    if (status === 'Overdue') return 'High';
    if (status === 'Pending') {
      const now = new Date();
      const scheduled = new Date();
      const [hours, minutes] = scheduledTime.split(':');
      scheduled.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const timeDiff = scheduled.getTime() - now.getTime();
      const minutesDiff = timeDiff / (1000 * 60);

      if (minutesDiff <= 30) return 'High';
      if (minutesDiff <= 60) return 'Medium';
    }
    return 'Low';
  };

  const filteredMedications =
    filterStatus === 'All'
      ? medications
      : medications.filter((med) => med.status === filterStatus);

  const administrationRate = Math.round(
    (medications.filter((med) => med.status === 'Administered').length /
      medications.length) *
      100
  );

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Medication Schedule
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Manage patient medication administration and scheduling
      </Typography>

      {/* Alert for overdue medications */}
      {medications.some((med) => med.status === 'Overdue') && (
        <Alert severity='error' sx={{ mb: 3 }}>
          <Typography variant='subtitle2'>
            You have{' '}
            {medications.filter((med) => med.status === 'Overdue').length}{' '}
            overdue medication(s) that require immediate attention!
          </Typography>
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='primary'>
                Total Medications
              </Typography>
              <Typography variant='h4'>{medications.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='warning.main'>
                Pending
              </Typography>
              <Typography variant='h4'>
                {medications.filter((med) => med.status === 'Pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='error.main'>
                Overdue
              </Typography>
              <Typography variant='h4'>
                {medications.filter((med) => med.status === 'Overdue').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='success.main'>
                Administration Rate
              </Typography>
              <Typography variant='h4'>{administrationRate}%</Typography>
              <LinearProgress
                variant='determinate'
                value={administrationRate}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Controls */}
      <Box mb={3}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label='Filter by Status'
          >
            <MenuItem value='All'>All Medications</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='Overdue'>Overdue</MenuItem>
            <MenuItem value='Administered'>Administered</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Medications Table */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Medication Schedule ({filterStatus})
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Medication</TableCell>
                  <TableCell>Dosage</TableCell>
                  <TableCell>Route</TableCell>
                  <TableCell>Scheduled Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMedications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={2}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {medication.patientName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant='body2'>
                            {medication.patientName}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Room {medication.room}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' fontWeight='medium'>
                        {medication.medication}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {medication.frequency}
                      </Typography>
                    </TableCell>
                    <TableCell>{medication.dosage}</TableCell>
                    <TableCell>{medication.route}</TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={1}>
                        <TimeIcon fontSize='small' />
                        <Typography variant='body2'>
                          {medication.scheduledTime}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(medication.status)}
                        label={medication.status}
                        color={getStatusColor(medication.status)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getPriorityLevel(
                          medication.status,
                          medication.scheduledTime
                        )}
                        color={
                          getPriorityLevel(
                            medication.status,
                            medication.scheduledTime
                          ) === 'High'
                            ? 'error'
                            : getPriorityLevel(
                                medication.status,
                                medication.scheduledTime
                              ) === 'Medium'
                            ? 'warning'
                            : 'info'
                        }
                        size='small'
                        variant='outlined'
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => handleViewMedication(medication)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      {medication.status !== 'Administered' && (
                        <Button
                          variant='contained'
                          size='small'
                          color='success'
                          onClick={() =>
                            handleAdministerMedication(medication.id)
                          }
                        >
                          Administer
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Medication Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Medication Details</DialogTitle>
        <DialogContent>
          {selectedMedication && (
            <Box>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Patient Name'
                    value={selectedMedication.patientName}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Room'
                    value={selectedMedication.room}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }}>
                    <Typography variant='subtitle2'>
                      Medication Information
                    </Typography>
                  </Divider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Medication'
                    value={selectedMedication.medication}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Dosage'
                    value={selectedMedication.dosage}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label='Route'
                    value={selectedMedication.route}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label='Frequency'
                    value={selectedMedication.frequency}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label='Scheduled Time'
                    value={selectedMedication.scheduledTime}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Prescribed By'
                    value={selectedMedication.prescribedBy}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Status'
                    value={selectedMedication.status}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Allergies'
                    value={selectedMedication.allergies}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Medication Notes'
                    value={selectedMedication.notes}
                    fullWidth
                    multiline
                    rows={3}
                    disabled
                    variant='filled'
                  />
                </Grid>
                {selectedMedication.status === 'Administered' && (
                  <>
                    <Grid size={{ xs: 12 }}>
                      <Divider sx={{ my: 2 }}>
                        <Typography variant='subtitle2'>
                          Administration Details
                        </Typography>
                      </Divider>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label='Administered At'
                        value={selectedMedication.administeredAt}
                        fullWidth
                        disabled
                        variant='filled'
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label='Administered By'
                        value={selectedMedication.administeredBy}
                        fullWidth
                        disabled
                        variant='filled'
                      />
                    </Grid>
                    {selectedMedication.administrationNotes && (
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label='Administration Notes'
                          value={selectedMedication.administrationNotes}
                          fullWidth
                          multiline
                          rows={2}
                          disabled
                          variant='filled'
                        />
                      </Grid>
                    )}
                  </>
                )}
                {selectedMedication.status !== 'Administered' && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label='Administration Notes (Optional)'
                      value={administrationNotes}
                      onChange={(e) => setAdministrationNotes(e.target.value)}
                      fullWidth
                      multiline
                      rows={2}
                      placeholder='Add any notes about the medication administration...'
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {selectedMedication &&
            selectedMedication.status !== 'Administered' && (
              <Button
                variant='contained'
                color='success'
                onClick={() => {
                  handleAdministerMedication(selectedMedication.id);
                  setOpenDialog(false);
                }}
              >
                Administer Medication
              </Button>
            )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
