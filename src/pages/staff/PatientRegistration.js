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
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const mockPatients = [
  {
    id: 1,
    patientId: 'P001',
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    address: '123 Main St, City, ST 12345',
    emergencyContact: 'Jane Smith - (555) 123-4568',
    insuranceProvider: 'HealthCare Plus',
    insuranceNumber: 'HCP123456789',
    registrationDate: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    patientId: 'P002',
    firstName: 'Mary',
    lastName: 'Davis',
    dateOfBirth: '1978-11-22',
    gender: 'Female',
    phone: '(555) 234-5678',
    email: 'mary.davis@email.com',
    address: '456 Oak Ave, City, ST 12345',
    emergencyContact: 'Robert Davis - (555) 234-5679',
    insuranceProvider: 'BlueCross Shield',
    insuranceNumber: 'BCS987654321',
    registrationDate: '2024-02-20',
    status: 'Active',
  },
  {
    id: 3,
    patientId: 'P003',
    firstName: 'Robert',
    lastName: 'Wilson',
    dateOfBirth: '1992-07-08',
    gender: 'Male',
    phone: '(555) 345-6789',
    email: 'robert.wilson@email.com',
    address: '789 Pine Rd, City, ST 12345',
    emergencyContact: 'Lisa Wilson - (555) 345-6790',
    insuranceProvider: 'Medicare',
    insuranceNumber: 'MED456789123',
    registrationDate: '2024-03-10',
    status: 'Active',
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

export default function PatientRegistration() {
  const [patients, setPatients] = useState(mockPatients);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [patientForm, setPatientForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    insuranceProvider: '',
    insuranceNumber: '',
  });

  const handleOpenDialog = (patient = null) => {
    if (patient) {
      setEditingPatient(patient);
      setPatientForm({
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        emergencyContact: patient.emergencyContact,
        insuranceProvider: patient.insuranceProvider,
        insuranceNumber: patient.insuranceNumber,
      });
    } else {
      setEditingPatient(null);
      setPatientForm({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergencyContact: '',
        insuranceProvider: '',
        insuranceNumber: '',
      });
    }
    setOpenDialog(true);
  };

  const generatePatientId = () => {
    const maxId = Math.max(
      ...patients.map((p) => parseInt(p.patientId.substring(1)))
    );
    return `P${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleSavePatient = () => {
    const patientData = {
      ...patientForm,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    };

    if (editingPatient) {
      setPatients(
        patients.map((patient) =>
          patient.id === editingPatient.id
            ? { ...patient, ...patientData }
            : patient
        )
      );
    } else {
      const newPatient = {
        id: Math.max(...patients.map((p) => p.id)) + 1,
        patientId: generatePatientId(),
        ...patientData,
      };
      setPatients([...patients, newPatient]);
    }

    setOpenDialog(false);
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  const getAgeFromDOB = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Patient Registration
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <PersonIcon color='primary' />
                <Typography variant='h6'>Total Patients</Typography>
              </Box>
              <Typography variant='h4'>{patients.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <PersonAddIcon color='success' />
                <Typography variant='h6'>New Today</Typography>
              </Box>
              <Typography variant='h4'>
                {
                  patients.filter(
                    (p) =>
                      p.registrationDate ===
                      new Date().toISOString().split('T')[0]
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Button
                variant='contained'
                fullWidth
                startIcon={<PersonAddIcon />}
                onClick={() => handleOpenDialog()}
              >
                Register New Patient
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems='center'>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                label='Search Patients'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search by name, ID, or phone number...'
                fullWidth
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant='body2' color='textSecondary'>
                Found {filteredPatients.length} of {patients.length} patients
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Registered Patients
          </Typography>
          {filteredPatients.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Age/Gender</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Insurance</TableCell>
                    <TableCell>Registration Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <Typography variant='body2' fontWeight='bold'>
                          {patient.patientId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='bold'>
                          {patient.firstName} {patient.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {getAgeFromDOB(patient.dateOfBirth)} years,{' '}
                          {patient.gender}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography
                            variant='body2'
                            display='flex'
                            alignItems='center'
                            gap={0.5}
                          >
                            <PhoneIcon fontSize='small' />
                            {patient.phone}
                          </Typography>
                          <Typography
                            variant='body2'
                            display='flex'
                            alignItems='center'
                            gap={0.5}
                          >
                            <EmailIcon fontSize='small' />
                            {patient.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {patient.insuranceProvider}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          {patient.insuranceNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>{patient.registrationDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={patient.status}
                          color={
                            patient.status === 'Active' ? 'success' : 'default'
                          }
                          size='small'
                        />
                      </TableCell>
                      <TableCell>
                        <Box display='flex' gap={1}>
                          <Button
                            size='small'
                            startIcon={<EditIcon />}
                            onClick={() => handleOpenDialog(patient)}
                          >
                            Edit
                          </Button>
                          <Button
                            size='small'
                            color='error'
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeletePatient(patient.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity='info'>
              No patients found.{' '}
              {searchTerm && 'Try adjusting your search criteria.'}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Patient Registration Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          {editingPatient ? 'Edit Patient Information' : 'Register New Patient'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='First Name'
                value={patientForm.firstName}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, firstName: e.target.value })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Last Name'
                value={patientForm.lastName}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, lastName: e.target.value })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Date of Birth'
                type='date'
                value={patientForm.dateOfBirth}
                onChange={(e) =>
                  setPatientForm({
                    ...patientForm,
                    dateOfBirth: e.target.value,
                  })
                }
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={patientForm.gender}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, gender: e.target.value })
                  }
                  label='Gender'
                >
                  <MenuItem value='Male'>Male</MenuItem>
                  <MenuItem value='Female'>Female</MenuItem>
                  <MenuItem value='Other'>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Phone Number'
                value={patientForm.phone}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, phone: e.target.value })
                }
                fullWidth
                required
                placeholder='(555) 123-4567'
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Email Address'
                type='email'
                value={patientForm.email}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, email: e.target.value })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label='Address'
                value={patientForm.address}
                onChange={(e) =>
                  setPatientForm({ ...patientForm, address: e.target.value })
                }
                fullWidth
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label='Emergency Contact'
                value={patientForm.emergencyContact}
                onChange={(e) =>
                  setPatientForm({
                    ...patientForm,
                    emergencyContact: e.target.value,
                  })
                }
                fullWidth
                required
                placeholder='Name - Phone Number'
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Insurance Provider</InputLabel>
                <Select
                  value={patientForm.insuranceProvider}
                  onChange={(e) =>
                    setPatientForm({
                      ...patientForm,
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
                label='Insurance Number'
                value={patientForm.insuranceNumber}
                onChange={(e) =>
                  setPatientForm({
                    ...patientForm,
                    insuranceNumber: e.target.value,
                  })
                }
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSavePatient}
            variant='contained'
            disabled={
              !patientForm.firstName ||
              !patientForm.lastName ||
              !patientForm.dateOfBirth ||
              !patientForm.phone
            }
          >
            {editingPatient ? 'Update' : 'Register'} Patient
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
