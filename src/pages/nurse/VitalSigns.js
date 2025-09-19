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
  Alert,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Thermostat as TempIcon,
  FavoriteRounded as HeartIcon,
  Air as RespirationIcon,
  Opacity as PressureIcon,
  Add as AddIcon,
  Edit as EditIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Remove as NormalIcon,
} from '@mui/icons-material';

const mockVitalSigns = [
  {
    id: 1,
    patientName: 'John Smith',
    room: '201A',
    lastRecorded: '2024-01-15 08:30',
    temperature: 98.6,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    heartRate: 72,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    pain: 2,
    notes: 'Patient stable, no concerns',
    recordedBy: 'Nurse Johnson',
  },
  {
    id: 2,
    patientName: 'Sarah Johnson',
    room: '105B',
    lastRecorded: '2024-01-15 07:45',
    temperature: 99.2,
    bloodPressureSystolic: 140,
    bloodPressureDiastolic: 90,
    heartRate: 88,
    respiratoryRate: 18,
    oxygenSaturation: 96,
    pain: 4,
    notes: 'Elevated BP, monitoring required',
    recordedBy: 'Nurse Williams',
  },
  {
    id: 3,
    patientName: 'Michael Brown',
    room: 'ICU-3',
    lastRecorded: '2024-01-15 09:00',
    temperature: 100.4,
    bloodPressureSystolic: 110,
    bloodPressureDiastolic: 70,
    heartRate: 95,
    respiratoryRate: 22,
    oxygenSaturation: 94,
    pain: 7,
    notes: 'Post-operative, fever present, pain management needed',
    recordedBy: 'Nurse Davis',
  },
  {
    id: 4,
    patientName: 'Emily Davis',
    room: '302C',
    lastRecorded: '2024-01-15 06:15',
    temperature: 97.8,
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 75,
    heartRate: 65,
    respiratoryRate: 14,
    oxygenSaturation: 99,
    pain: 1,
    notes: 'All vitals within normal range',
    recordedBy: 'Nurse Thompson',
  },
];

const normalRanges = {
  temperature: { min: 97.0, max: 99.5, unit: '°F' },
  bloodPressureSystolic: { min: 90, max: 139, unit: 'mmHg' },
  bloodPressureDiastolic: { min: 60, max: 89, unit: 'mmHg' },
  heartRate: { min: 60, max: 100, unit: 'bpm' },
  respiratoryRate: { min: 12, max: 20, unit: '/min' },
  oxygenSaturation: { min: 95, max: 100, unit: '%' },
  pain: { min: 0, max: 3, unit: '/10' },
};

export default function VitalSigns() {
  const [vitalSigns, setVitalSigns] = useState(mockVitalSigns);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newVitals, setNewVitals] = useState({
    temperature: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    pain: '',
    notes: '',
  });

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setNewVitals({
      temperature: patient.temperature,
      bloodPressureSystolic: patient.bloodPressureSystolic,
      bloodPressureDiastolic: patient.bloodPressureDiastolic,
      heartRate: patient.heartRate,
      respiratoryRate: patient.respiratoryRate,
      oxygenSaturation: patient.oxygenSaturation,
      pain: patient.pain,
      notes: patient.notes,
    });
    setOpenDialog(true);
  };

  const handleAddNewVitals = (patient) => {
    setSelectedPatient(patient);
    setNewVitals({
      temperature: '',
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      pain: '',
      notes: '',
    });
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSaveVitals = () => {
    const currentTime = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    setVitalSigns(
      vitalSigns.map((patient) =>
        patient.id === selectedPatient.id
          ? {
              ...patient,
              ...newVitals,
              lastRecorded: currentTime,
              recordedBy: 'Current Nurse',
            }
          : patient
      )
    );
    setIsEditing(false);
    setOpenDialog(false);
  };

  const getVitalStatus = (value, vitalType) => {
    const range = normalRanges[vitalType];
    if (!range) return 'normal';

    if (value < range.min) return 'low';
    if (value > range.max) return 'high';
    return 'normal';
  };

  const getStatusIcon = (status) => {
    const icons = {
      normal: <NormalIcon color='success' />,
      high: <TrendingUpIcon color='error' />,
      low: <TrendingDownIcon color='warning' />,
    };
    return icons[status] || <NormalIcon />;
  };

  const getStatusColor = (status) => {
    const colors = {
      normal: 'success',
      high: 'error',
      low: 'warning',
    };
    return colors[status] || 'default';
  };

  const hasAbnormalVitals = (patient) => {
    return [
      'temperature',
      'bloodPressureSystolic',
      'bloodPressureDiastolic',
      'heartRate',
      'respiratoryRate',
      'oxygenSaturation',
      'pain',
    ].some((vital) => getVitalStatus(patient[vital], vital) !== 'normal');
  };

  const abnormalPatientsCount = vitalSigns.filter(hasAbnormalVitals).length;

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Vital Signs Management
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Monitor and record patient vital signs throughout the day
      </Typography>

      {/* Alert for abnormal vitals */}
      {abnormalPatientsCount > 0 && (
        <Alert severity='warning' sx={{ mb: 3 }}>
          <Typography variant='subtitle2'>
            {abnormalPatientsCount} patient(s) have abnormal vital signs that
            require attention!
          </Typography>
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='primary'>
                Total Patients
              </Typography>
              <Typography variant='h4'>{vitalSigns.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='success.main'>
                Normal Vitals
              </Typography>
              <Typography variant='h4'>
                {vitalSigns.length - abnormalPatientsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='warning.main'>
                Abnormal Vitals
              </Typography>
              <Typography variant='h4'>{abnormalPatientsCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='info.main'>
                Recorded Today
              </Typography>
              <Typography variant='h4'>{vitalSigns.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Vital Signs Table */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Patient Vital Signs
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Blood Pressure</TableCell>
                  <TableCell>Heart Rate</TableCell>
                  <TableCell>Resp. Rate</TableCell>
                  <TableCell>O2 Sat</TableCell>
                  <TableCell>Pain Level</TableCell>
                  <TableCell>Last Recorded</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vitalSigns.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={2}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {patient.patientName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant='body2'>
                            {patient.patientName}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Room {patient.room}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={1}>
                        {getStatusIcon(
                          getVitalStatus(patient.temperature, 'temperature')
                        )}
                        <Typography variant='body2'>
                          {patient.temperature}°F
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={1}>
                        {getStatusIcon(
                          getVitalStatus(
                            patient.bloodPressureSystolic,
                            'bloodPressureSystolic'
                          )
                        )}
                        <Typography variant='body2'>
                          {patient.bloodPressureSystolic}/
                          {patient.bloodPressureDiastolic}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={1}>
                        {getStatusIcon(
                          getVitalStatus(patient.heartRate, 'heartRate')
                        )}
                        <Typography variant='body2'>
                          {patient.heartRate} bpm
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={1}>
                        {getStatusIcon(
                          getVitalStatus(
                            patient.respiratoryRate,
                            'respiratoryRate'
                          )
                        )}
                        <Typography variant='body2'>
                          {patient.respiratoryRate}/min
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={1}>
                        {getStatusIcon(
                          getVitalStatus(
                            patient.oxygenSaturation,
                            'oxygenSaturation'
                          )
                        )}
                        <Typography variant='body2'>
                          {patient.oxygenSaturation}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${patient.pain}/10`}
                        color={getStatusColor(
                          getVitalStatus(patient.pain, 'pain')
                        )}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='caption'>
                        {patient.lastRecorded}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => handleViewPatient(patient)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        variant='contained'
                        size='small'
                        color='primary'
                        startIcon={<AddIcon />}
                        onClick={() => handleAddNewVitals(patient)}
                      >
                        Record
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Vital Signs Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setIsEditing(false);
        }}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          {isEditing ? 'Record New Vital Signs' : 'Vital Signs Details'}
          {selectedPatient && (
            <Typography variant='subtitle2' color='text.secondary'>
              {selectedPatient.patientName} - Room {selectedPatient.room}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedPatient && (
            <Box>
              <Grid container spacing={3}>
                {/* Normal Ranges Reference */}
                <Grid size={{ xs: 12 }}>
                  <Card variant='outlined' sx={{ bgcolor: 'grey.50' }}>
                    <CardContent>
                      <Typography variant='subtitle2' gutterBottom>
                        Normal Ranges Reference
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <TempIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary='Temperature: 97.0 - 99.5°F'
                            secondary='Body temperature'
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PressureIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary='Blood Pressure: 90-139/60-89 mmHg'
                            secondary='Systolic/Diastolic pressure'
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <HeartIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary='Heart Rate: 60-100 bpm'
                            secondary='Beats per minute'
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <RespirationIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary='Respiratory Rate: 12-20/min, O2 Sat: 95-100%'
                            secondary='Breathing and oxygen levels'
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }}>
                    <Typography variant='subtitle2'>Vital Signs</Typography>
                  </Divider>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Temperature'
                    value={newVitals.temperature}
                    onChange={(e) =>
                      setNewVitals({
                        ...newVitals,
                        temperature: e.target.value,
                      })
                    }
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>°F</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label='Systolic BP'
                    value={newVitals.bloodPressureSystolic}
                    onChange={(e) =>
                      setNewVitals({
                        ...newVitals,
                        bloodPressureSystolic: e.target.value,
                      })
                    }
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>mmHg</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label='Diastolic BP'
                    value={newVitals.bloodPressureDiastolic}
                    onChange={(e) =>
                      setNewVitals({
                        ...newVitals,
                        bloodPressureDiastolic: e.target.value,
                      })
                    }
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>mmHg</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Heart Rate'
                    value={newVitals.heartRate}
                    onChange={(e) =>
                      setNewVitals({ ...newVitals, heartRate: e.target.value })
                    }
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>bpm</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Respiratory Rate'
                    value={newVitals.respiratoryRate}
                    onChange={(e) =>
                      setNewVitals({
                        ...newVitals,
                        respiratoryRate: e.target.value,
                      })
                    }
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>/min</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label='Oxygen Saturation'
                    value={newVitals.oxygenSaturation}
                    onChange={(e) =>
                      setNewVitals({
                        ...newVitals,
                        oxygenSaturation: e.target.value,
                      })
                    }
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>%</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel>Pain Level</InputLabel>
                    <Select
                      value={newVitals.pain}
                      onChange={(e) =>
                        setNewVitals({ ...newVitals, pain: e.target.value })
                      }
                      label='Pain Level'
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}/10{' '}
                          {level === 0
                            ? '(No Pain)'
                            : level <= 3
                            ? '(Mild)'
                            : level <= 6
                            ? '(Moderate)'
                            : '(Severe)'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Notes'
                    value={newVitals.notes}
                    onChange={(e) =>
                      setNewVitals({ ...newVitals, notes: e.target.value })
                    }
                    fullWidth
                    multiline
                    rows={3}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    placeholder='Add any relevant notes about the patient...'
                  />
                </Grid>
                {!isEditing && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label='Last Recorded'
                        value={selectedPatient.lastRecorded}
                        fullWidth
                        disabled
                        variant='filled'
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label='Recorded By'
                        value={selectedPatient.recordedBy}
                        fullWidth
                        disabled
                        variant='filled'
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
          {isEditing ? (
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveVitals}
            >
              Save Vital Signs
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Record New Vitals
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
