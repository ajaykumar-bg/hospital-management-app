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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Paper,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

const mockAppointments = [
  {
    id: 1,
    patientName: 'John Smith',
    patientId: 'P001',
    doctor: 'Dr. Sarah Johnson',
    date: '2024-10-15',
    time: '10:00 AM',
    type: 'Follow-up',
    status: 'Confirmed',
    duration: '30 min',
    room: 'Room 302',
  },
  {
    id: 2,
    patientName: 'Mary Davis',
    patientId: 'P002',
    doctor: 'Dr. Michael Chen',
    date: '2024-10-15',
    time: '11:30 AM',
    type: 'Consultation',
    status: 'Pending',
    duration: '45 min',
    room: 'Room 205',
  },
  {
    id: 3,
    patientName: 'Robert Wilson',
    patientId: 'P003',
    doctor: 'Dr. Emily Rodriguez',
    date: '2024-10-16',
    time: '2:00 PM',
    type: 'Routine Checkup',
    status: 'Confirmed',
    duration: '30 min',
    room: 'Room 108',
  },
];

const mockDoctors = [
  'Dr. Sarah Johnson',
  'Dr. Michael Chen',
  'Dr. Emily Rodriguez',
  'Dr. James Wilson',
  'Dr. Lisa Thompson',
];

const timeSlots = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
];

const appointmentTypes = [
  'Routine Checkup',
  'Follow-up',
  'Consultation',
  'Emergency',
  'Screening',
];
const rooms = [
  'Room 101',
  'Room 102',
  'Room 108',
  'Room 205',
  'Room 302',
  'Room 401',
];

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    patientId: '',
    doctor: '',
    date: '',
    time: '',
    type: '',
    duration: '30',
    room: '',
  });

  const handleOpenDialog = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setAppointmentForm({
        patientName: appointment.patientName,
        patientId: appointment.patientId,
        doctor: appointment.doctor,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        duration: appointment.duration.replace(' min', ''),
        room: appointment.room,
      });
    } else {
      setEditingAppointment(null);
      setAppointmentForm({
        patientName: '',
        patientId: '',
        doctor: '',
        date: '',
        time: '',
        type: '',
        duration: '30',
        room: '',
      });
    }
    setOpenDialog(true);
  };

  const handleSaveAppointment = () => {
    const appointmentData = {
      ...appointmentForm,
      duration: appointmentForm.duration + ' min',
      status: editingAppointment ? editingAppointment.status : 'Pending',
    };

    if (editingAppointment) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === editingAppointment.id
            ? { ...apt, ...appointmentData }
            : apt
        )
      );
    } else {
      const newAppointment = {
        id: Math.max(...appointments.map((a) => a.id)) + 1,
        ...appointmentData,
      };
      setAppointments([...appointments, newAppointment]);
    }

    setOpenDialog(false);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const handleConfirmAppointment = (id) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'Confirmed' } : apt
      )
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      Confirmed: 'success',
      Pending: 'warning',
      Cancelled: 'error',
      Completed: 'info',
    };
    return colors[status] || 'default';
  };

  const todaysAppointments = appointments.filter(
    (apt) => apt.date === new Date().toISOString().split('T')[0]
  );

  const pendingAppointments = appointments.filter(
    (apt) => apt.status === 'Pending'
  );

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Appointment Management
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <ScheduleIcon color='primary' />
                <Typography variant='h6'>Today's Appointments</Typography>
              </Box>
              <Typography variant='h4'>{todaysAppointments.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <PersonIcon color='info' />
                <Typography variant='h6'>Total Appointments</Typography>
              </Box>
              <Typography variant='h4'>{appointments.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={1}>
                <CheckIcon color='warning' />
                <Typography variant='h6'>Pending</Typography>
              </Box>
              <Typography variant='h4'>{pendingAppointments.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Button
                variant='contained'
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                New Appointment
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Today's Schedule */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Today's Schedule
          </Typography>
          {todaysAppointments.length > 0 ? (
            <Grid container spacing={2}>
              {todaysAppointments.map((appointment) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={appointment.id}>
                  <Paper sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='start'
                      mb={1}
                    >
                      <Typography variant='subtitle1' fontWeight='bold'>
                        {appointment.time}
                      </Typography>
                      <Chip
                        label={appointment.status}
                        color={getStatusColor(appointment.status)}
                        size='small'
                      />
                    </Box>
                    <Typography variant='body1'>
                      {appointment.patientName}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {appointment.doctor}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {appointment.type} - {appointment.duration}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {appointment.room}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity='info'>No appointments scheduled for today.</Alert>
          )}
        </CardContent>
      </Card>

      {/* All Appointments Table */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            All Appointments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <Box>
                        <Typography variant='body2' fontWeight='bold'>
                          {appointment.patientName}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          ID: {appointment.patientId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>{appointment.room}</TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.status}
                        color={getStatusColor(appointment.status)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Box display='flex' gap={1}>
                        <Button
                          size='small'
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenDialog(appointment)}
                        >
                          Edit
                        </Button>
                        {appointment.status === 'Pending' && (
                          <Button
                            size='small'
                            color='success'
                            startIcon={<CheckIcon />}
                            onClick={() =>
                              handleConfirmAppointment(appointment.id)
                            }
                          >
                            Confirm
                          </Button>
                        )}
                        <Button
                          size='small'
                          color='error'
                          startIcon={<DeleteIcon />}
                          onClick={() =>
                            handleDeleteAppointment(appointment.id)
                          }
                        >
                          Cancel
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Appointment Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          {editingAppointment ? 'Edit Appointment' : 'New Appointment'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Patient Name'
                value={appointmentForm.patientName}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    patientName: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Patient ID'
                value={appointmentForm.patientId}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    patientId: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={appointmentForm.doctor}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      doctor: e.target.value,
                    })
                  }
                  label='Doctor'
                >
                  {mockDoctors.map((doctor) => (
                    <MenuItem key={doctor} value={doctor}>
                      {doctor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Appointment Type</InputLabel>
                <Select
                  value={appointmentForm.type}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      type: e.target.value,
                    })
                  }
                  label='Appointment Type'
                >
                  {appointmentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Date'
                type='date'
                value={appointmentForm.date}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    date: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Time</InputLabel>
                <Select
                  value={appointmentForm.time}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      time: e.target.value,
                    })
                  }
                  label='Time'
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Duration (minutes)</InputLabel>
                <Select
                  value={appointmentForm.duration}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      duration: e.target.value,
                    })
                  }
                  label='Duration (minutes)'
                >
                  <MenuItem value='15'>15 minutes</MenuItem>
                  <MenuItem value='30'>30 minutes</MenuItem>
                  <MenuItem value='45'>45 minutes</MenuItem>
                  <MenuItem value='60'>60 minutes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Room</InputLabel>
                <Select
                  value={appointmentForm.room}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      room: e.target.value,
                    })
                  }
                  label='Room'
                >
                  {rooms.map((room) => (
                    <MenuItem key={room} value={room}>
                      {room}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveAppointment}
            variant='contained'
            disabled={
              !appointmentForm.patientName ||
              !appointmentForm.doctor ||
              !appointmentForm.date ||
              !appointmentForm.time
            }
          >
            {editingAppointment ? 'Update' : 'Create'} Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
