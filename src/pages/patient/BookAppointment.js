import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Person as DoctorIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  EventAvailable as AvailableIcon,
} from '@mui/icons-material';

const mockAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2024-10-15',
    time: '10:00 AM',
    status: 'Confirmed',
    type: 'Follow-up',
    location: 'Room 302',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: '2024-10-22',
    time: '2:30 PM',
    status: 'Pending',
    type: 'Consultation',
    location: 'Room 205',
  },
];

const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatology' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedics' },
  { id: 5, name: 'Dr. Lisa Thompson', specialty: 'Internal Medicine' },
];

const mockTimeSlots = [
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

export default function BookAppointment() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    date: '',
    time: '',
    type: '',
    reason: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleBookAppointment = () => {
    setOpenDialog(true);
  };

  const handleDateChange = (date) => {
    setNewAppointment({ ...newAppointment, date });
    // Simulate checking available slots
    const bookedSlots = appointments
      .filter((apt) => apt.date === date)
      .map((apt) => apt.time);
    const available = mockTimeSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );
    setAvailableSlots(available);
  };

  const handleSubmitAppointment = () => {
    const selectedDoctor = mockDoctors.find(
      (doc) => doc.id === newAppointment.doctor
    );
    const appointment = {
      id: appointments.length + 1,
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: newAppointment.date,
      time: newAppointment.time,
      status: 'Pending',
      type: newAppointment.type,
      location: 'TBD',
    };

    setAppointments([...appointments, appointment]);
    setOpenDialog(false);
    setNewAppointment({
      doctor: '',
      date: '',
      time: '',
      type: '',
      reason: '',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      Confirmed: 'success',
      Pending: 'warning',
      Cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.date) >= new Date()
  );

  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.date) < new Date()
  );

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Book Appointment
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={2}>
                <CalendarIcon color='primary' />
                <Typography variant='h6'>Quick Book</Typography>
              </Box>
              <Button
                variant='contained'
                fullWidth
                startIcon={<AddIcon />}
                onClick={handleBookAppointment}
              >
                Book New Appointment
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={2}>
                <AvailableIcon color='success' />
                <Typography variant='h6'>Upcoming</Typography>
              </Box>
              <Typography variant='h4'>
                {upcomingAppointments.length}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Scheduled appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' gap={1} mb={2}>
                <DoctorIcon color='info' />
                <Typography variant='h6'>Available Doctors</Typography>
              </Box>
              <Typography variant='h4'>{mockDoctors.length}</Typography>
              <Typography variant='body2' color='textSecondary'>
                Different specialties
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Upcoming Appointments
              </Typography>
              {upcomingAppointments.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Doctor</TableCell>
                        <TableCell>Specialty</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Location</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {upcomingAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.doctor}</TableCell>
                          <TableCell>{appointment.specialty}</TableCell>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.type}</TableCell>
                          <TableCell>
                            <Chip
                              label={appointment.status}
                              color={getStatusColor(appointment.status)}
                              size='small'
                            />
                          </TableCell>
                          <TableCell>{appointment.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity='info'>
                  No upcoming appointments. Book your next appointment now!
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Past Appointments */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Appointment History
              </Typography>
              {pastAppointments.length > 0 ? (
                <List>
                  {pastAppointments.map((appointment) => (
                    <React.Fragment key={appointment.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${appointment.doctor} - ${appointment.specialty}`}
                          secondary={`${appointment.date} at ${appointment.time} - ${appointment.type}`}
                        />
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status)}
                          size='small'
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No past appointments found.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Available Doctors */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Available Doctors
              </Typography>
              <List>
                {mockDoctors.map((doctor) => (
                  <React.Fragment key={doctor.id}>
                    <ListItem>
                      <ListItemText
                        primary={doctor.name}
                        secondary={doctor.specialty}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Next Available */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Next Available Slots
              </Typography>
              <Paper sx={{ p: 2 }}>
                <Box display='flex' alignItems='center' gap={1} mb={1}>
                  <TimeIcon color='primary' />
                  <Typography variant='body1' fontWeight='bold'>
                    Today
                  </Typography>
                </Box>
                <Typography variant='body2' color='textSecondary'>
                  3:00 PM - Dr. Lisa Thompson
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  4:30 PM - Dr. James Wilson
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, mt: 1 }}>
                <Box display='flex' alignItems='center' gap={1} mb={1}>
                  <TimeIcon color='primary' />
                  <Typography variant='body1' fontWeight='bold'>
                    Tomorrow
                  </Typography>
                </Box>
                <Typography variant='body2' color='textSecondary'>
                  9:00 AM - Dr. Emily Rodriguez
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  10:30 AM - Dr. Sarah Johnson
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Book Appointment Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>
          <Box display='flex' alignItems='center' gap={1}>
            <AddIcon />
            Book New Appointment
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Doctor</InputLabel>
                <Select
                  value={newAppointment.doctor}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      doctor: e.target.value,
                    })
                  }
                  label='Select Doctor'
                >
                  {mockDoctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Appointment Date'
                type='date'
                value={newAppointment.date}
                onChange={(e) => handleDateChange(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={!newAppointment.date}>
                <InputLabel>Available Time Slots</InputLabel>
                <Select
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      time: e.target.value,
                    })
                  }
                  label='Available Time Slots'
                >
                  {availableSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Appointment Type</InputLabel>
                <Select
                  value={newAppointment.type}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
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
            <Grid item xs={12}>
              <TextField
                label='Reason for Visit'
                value={newAppointment.reason}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    reason: e.target.value,
                  })
                }
                multiline
                rows={3}
                fullWidth
                placeholder='Please describe your symptoms or reason for the appointment...'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitAppointment}
            variant='contained'
            disabled={
              !newAppointment.doctor ||
              !newAppointment.date ||
              !newAppointment.time ||
              !newAppointment.type
            }
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
