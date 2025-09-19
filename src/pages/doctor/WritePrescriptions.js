import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  LocalPharmacy as PharmacyIcon,
} from '@mui/icons-material';

const mockMedications = [
  'Amoxicillin 500mg',
  'Lisinopril 10mg',
  'Metformin 500mg',
  'Atorvastatin 20mg',
  'Omeprazole 20mg',
  'Albuterol Inhaler',
  'Prednisone 5mg',
  'Warfarin 5mg',
  'Hydrochlorothiazide 25mg',
  'Gabapentin 300mg',
];

const mockPatients = [
  { id: 1, name: 'John Smith', dob: '1978-05-15', mrn: 'MRN001' },
  { id: 2, name: 'Sarah Johnson', dob: '1992-03-22', mrn: 'MRN002' },
  { id: 3, name: 'Michael Brown', dob: '1956-11-30', mrn: 'MRN003' },
];

const mockPrescriptions = [
  {
    id: 1,
    patientName: 'John Smith',
    medications: [
      {
        name: 'Lisinopril 10mg',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
      },
      {
        name: 'Metformin 500mg',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '30 days',
      },
    ],
    date: '2024-09-18',
    status: 'Active',
  },
  {
    id: 2,
    patientName: 'Sarah Johnson',
    medications: [
      {
        name: 'Amoxicillin 500mg',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '7 days',
      },
    ],
    date: '2024-09-17',
    status: 'Completed',
  },
];

export default function WritePrescriptions() {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medications, setMedications] = useState([]);
  const [currentMedication, setCurrentMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
  });

  const handleAddMedication = () => {
    if (
      currentMedication.name &&
      currentMedication.dosage &&
      currentMedication.frequency
    ) {
      setMedications([
        ...medications,
        { ...currentMedication, id: Date.now() },
      ]);
      setCurrentMedication({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      });
    }
  };

  const handleRemoveMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleSavePrescription = () => {
    if (selectedPatient && medications.length > 0) {
      const newPrescription = {
        id: Date.now(),
        patientName: selectedPatient.name,
        medications: medications,
        date: new Date().toISOString().split('T')[0],
        status: 'Active',
      };
      setPrescriptions([...prescriptions, newPrescription]);
      setOpenDialog(false);
      setSelectedPatient(null);
      setMedications([]);
    }
  };

  const handlePrintPrescription = (prescription) => {
    console.log('Printing prescription:', prescription);
    // Implementation for printing functionality
  };

  const getStatusColor = (status) => {
    return status === 'Active'
      ? 'success'
      : status === 'Completed'
      ? 'info'
      : 'default';
  };

  return (
    <Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <Typography variant='h4'>Write Prescriptions</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          New Prescription
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Recent Prescriptions */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Recent Prescriptions
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Medications</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell>{prescription.patientName}</TableCell>
                        <TableCell>{prescription.date}</TableCell>
                        <TableCell>
                          <Box>
                            {prescription.medications.map((med, index) => (
                              <Typography key={index} variant='body2'>
                                {med.name} - {med.frequency}
                              </Typography>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={prescription.status}
                            color={getStatusColor(prescription.status)}
                            size='small'
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size='small'
                            onClick={() =>
                              handlePrintPrescription(prescription)
                            }
                          >
                            <PrintIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* New Prescription Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          <Box display='flex' alignItems='center' gap={1}>
            <PharmacyIcon />
            Write New Prescription
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Patient Selection */}
            <Grid container spacing={2} mb={3}>
              <Grid size={{ xs: 12 }}>
                <Autocomplete
                  options={mockPatients}
                  getOptionLabel={(option) => `${option.name} (${option.mrn})`}
                  value={selectedPatient}
                  onChange={(event, newValue) => setSelectedPatient(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label='Select Patient' fullWidth />
                  )}
                />
              </Grid>
            </Grid>

            {/* Medication Entry */}
            <Typography variant='h6' gutterBottom>
              Add Medications
            </Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    options={mockMedications}
                    value={currentMedication.name}
                    onChange={(event, newValue) =>
                      setCurrentMedication({
                        ...currentMedication,
                        name: newValue || '',
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} label='Medication' fullWidth />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label='Dosage'
                    value={currentMedication.dosage}
                    onChange={(e) =>
                      setCurrentMedication({
                        ...currentMedication,
                        dosage: e.target.value,
                      })
                    }
                    placeholder='e.g., 10mg'
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      value={currentMedication.frequency}
                      onChange={(e) =>
                        setCurrentMedication({
                          ...currentMedication,
                          frequency: e.target.value,
                        })
                      }
                      label='Frequency'
                    >
                      <MenuItem value='Once daily'>Once daily</MenuItem>
                      <MenuItem value='Twice daily'>Twice daily</MenuItem>
                      <MenuItem value='Three times daily'>
                        Three times daily
                      </MenuItem>
                      <MenuItem value='Four times daily'>
                        Four times daily
                      </MenuItem>
                      <MenuItem value='Every 8 hours'>Every 8 hours</MenuItem>
                      <MenuItem value='Every 12 hours'>Every 12 hours</MenuItem>
                      <MenuItem value='As needed'>As needed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Duration'
                    value={currentMedication.duration}
                    onChange={(e) =>
                      setCurrentMedication({
                        ...currentMedication,
                        duration: e.target.value,
                      })
                    }
                    placeholder='e.g., 30 days'
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Special Instructions'
                    value={currentMedication.instructions}
                    onChange={(e) =>
                      setCurrentMedication({
                        ...currentMedication,
                        instructions: e.target.value,
                      })
                    }
                    placeholder='e.g., Take with food'
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant='outlined'
                    onClick={handleAddMedication}
                    disabled={
                      !currentMedication.name ||
                      !currentMedication.dosage ||
                      !currentMedication.frequency
                    }
                  >
                    Add Medication
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Added Medications List */}
            {medications.length > 0 && (
              <>
                <Typography variant='h6' gutterBottom>
                  Prescription Summary
                </Typography>
                <TableContainer component={Paper}>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Medication</TableCell>
                        <TableCell>Dosage</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Instructions</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {medications.map((med) => (
                        <TableRow key={med.id}>
                          <TableCell>{med.name}</TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>{med.frequency}</TableCell>
                          <TableCell>{med.duration}</TableCell>
                          <TableCell>{med.instructions}</TableCell>
                          <TableCell>
                            <IconButton
                              size='small'
                              color='error'
                              onClick={() => handleRemoveMedication(med.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSavePrescription}
            variant='contained'
            disabled={!selectedPatient || medications.length === 0}
          >
            Save Prescription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
