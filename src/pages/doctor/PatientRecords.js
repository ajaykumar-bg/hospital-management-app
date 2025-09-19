import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  MedicalServices as MedicalIcon,
  History as HistoryIcon,
  Assignment as PrescriptionIcon,
} from '@mui/icons-material';

const mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    lastVisit: '2024-09-15',
    status: 'Stable',
    room: '201A',
    medicalHistory: ['Diabetes Type 2', 'High Blood Pressure'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    vitals: { bp: '130/85', pulse: '72', temp: '98.6°F', weight: '180 lbs' },
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    condition: 'Pneumonia',
    lastVisit: '2024-09-18',
    status: 'Improving',
    room: '105B',
    medicalHistory: ['Asthma'],
    currentMedications: ['Amoxicillin 875mg', 'Albuterol Inhaler'],
    vitals: { bp: '118/76', pulse: '68', temp: '99.2°F', weight: '125 lbs' },
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 67,
    gender: 'Male',
    condition: 'Post-Surgery Recovery',
    lastVisit: '2024-09-17',
    status: 'Critical',
    room: 'ICU-3',
    medicalHistory: ['Heart Disease', 'Stroke'],
    currentMedications: ['Warfarin 5mg', 'Atorvastatin 40mg'],
    vitals: { bp: '145/92', pulse: '85', temp: '98.9°F', weight: '165 lbs' },
  },
];

export default function PatientRecords() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
    setTabValue(0);
  };

  const getStatusColor = (status) => {
    const colors = {
      Stable: 'success',
      Improving: 'info',
      Critical: 'error',
      Moderate: 'warning',
    };
    return colors[status] || 'default';
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Patient Records
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Age/Gender</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <Box display='flex' alignItems='center' gap={2}>
                    <Avatar>{patient.name.charAt(0)}</Avatar>
                    <Typography variant='body2'>{patient.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {patient.age} / {patient.gender}
                </TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>{patient.room}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.status}
                    color={getStatusColor(patient.status)}
                    size='small'
                  />
                </TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    size='small'
                    startIcon={<ViewIcon />}
                    onClick={() => handleViewPatient(patient)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Patient Details: {selectedPatient?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label='Overview' icon={<MedicalIcon />} />
              <Tab label='Medical History' icon={<HistoryIcon />} />
              <Tab label='Current Medications' icon={<PrescriptionIcon />} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Patient Information
                    </Typography>
                    <Typography>
                      <strong>Age:</strong> {selectedPatient?.age}
                    </Typography>
                    <Typography>
                      <strong>Gender:</strong> {selectedPatient?.gender}
                    </Typography>
                    <Typography>
                      <strong>Room:</strong> {selectedPatient?.room}
                    </Typography>
                    <Typography>
                      <strong>Condition:</strong> {selectedPatient?.condition}
                    </Typography>
                    <Typography>
                      <strong>Status:</strong>
                      <Chip
                        label={selectedPatient?.status}
                        color={getStatusColor(selectedPatient?.status)}
                        size='small'
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Current Vitals
                    </Typography>
                    <Typography>
                      <strong>Blood Pressure:</strong>{' '}
                      {selectedPatient?.vitals.bp}
                    </Typography>
                    <Typography>
                      <strong>Pulse:</strong> {selectedPatient?.vitals.pulse}{' '}
                      bpm
                    </Typography>
                    <Typography>
                      <strong>Temperature:</strong>{' '}
                      {selectedPatient?.vitals.temp}
                    </Typography>
                    <Typography>
                      <strong>Weight:</strong> {selectedPatient?.vitals.weight}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant='h6' gutterBottom>
              Medical History
            </Typography>
            <List>
              {selectedPatient?.medicalHistory.map((condition, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText primary={condition} />
                  </ListItem>
                  {index < selectedPatient.medicalHistory.length - 1 && (
                    <Divider />
                  )}
                </div>
              ))}
            </List>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant='h6' gutterBottom>
              Current Medications
            </Typography>
            <List>
              {selectedPatient?.currentMedications.map((medication, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={medication}
                      secondary='Take as prescribed'
                    />
                  </ListItem>
                  {index < selectedPatient.currentMedications.length - 1 && (
                    <Divider />
                  )}
                </div>
              ))}
            </List>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant='contained'>Update Record</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
