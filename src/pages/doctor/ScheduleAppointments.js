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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const mockAppointments = [
  {
    id: 1,
    patientName: 'John Smith',
    date: '2024-09-20',
    time: '09:00',
    duration: 30,
    type: 'Follow-up',
    status: 'Scheduled',
    notes: 'Blood pressure check',
  },
  {
    id: 2,
    patientName: 'Sarah Johnson',
    date: '2024-09-20',
    time: '10:30',
    duration: 45,
    type: 'Consultation',
    status: 'Confirmed',
    notes: 'Chest pain evaluation',
  },
  {
    id: 3,
    patientName: 'Michael Brown',
    date: '2024-09-21',
    time: '14:00',
    duration: 60,
    type: 'Surgery Consultation',
    status: 'Pending',
    notes: 'Pre-operative assessment',
  },
];

const timeSlots = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
];

export default function ScheduleAppointments() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-09-20');
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    time: '',
    duration: 30,
    type: '',
    notes: '',
  });

  const handleAddAppointment = () => {
    setFormData({
      patientName: '',
      date: selectedDate,
      time: '',
      duration: 30,
      type: '',
      notes: '',
    });
    setOpenDialog(true);
  };

  const handleSaveAppointment = () => {
    const newAppointment = {
      id: Date.now(),
      ...formData,
      status: 'Scheduled',
    };
    setAppointments([...appointments, newAppointment]);
    setOpenDialog(false);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const getStatusColor = (status) => {
    const colors = {
      Scheduled: 'primary',
      Confirmed: 'success',
      Pending: 'warning',
      Cancelled: 'error',
      Completed: 'info',
    };
    return colors[status] || 'default';
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter((apt) => apt.date === date);
  };

  const getAvailableSlots = (date) => {
    const bookedSlots = getAppointmentsForDate(date).map((apt) => apt.time);
    return timeSlots.filter((slot) => !bookedSlots.includes(slot));
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Schedule Appointments
      </Typography>

      <Grid container spacing={3}>
        {/* Calendar/Date Selection */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Select Date
              </Typography>
              <TextField
                type='date'
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={handleAddAppointment}
                fullWidth
              >
                Add Appointment
              </Button>

              <Typography variant='h6' sx={{ mt: 3, mb: 1 }}>
                Available Time Slots
              </Typography>
              <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                {getAvailableSlots(selectedDate).map((slot) => (
                  <Chip
                    key={slot}
                    label={slot}
                    variant='outlined'
                    size='small'
                    sx={{ m: 0.5 }}
                    color='success'
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments for Selected Date */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Appointments for {selectedDate}
              </Typography>
              <List>
                {getAppointmentsForDate(selectedDate).map((appointment) => (
                  <ListItem
                    key={appointment.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: 'background.paper',
                    }}
                    secondaryAction={
                      <Box>
                        <IconButton size='small'>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size='small'
                          color='error'
                          onClick={() =>
                            handleDeleteAppointment(appointment.id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box display='flex' alignItems='center' gap={1}>
                          <Typography
                            variant='body1'
                            fontWeight='bold'
                            component='span'
                          >
                            {appointment.time} - {appointment.patientName}
                          </Typography>
                          <Chip
                            label={appointment.status}
                            color={getStatusColor(appointment.status)}
                            size='small'
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='span'
                            display='block'
                          >
                            Type: {appointment.type} | Duration:{' '}
                            {appointment.duration} min
                          </Typography>
                          {appointment.notes && (
                            <Typography
                              variant='body2'
                              color='textSecondary'
                              component='span'
                              display='block'
                            >
                              Notes: {appointment.notes}
                            </Typography>
                          )}
                        </Box>
                      }
                      slotProps={{
                        secondary: {
                          component: 'div',
                        },
                      }}
                    />
                  </ListItem>
                ))}
                {getAppointmentsForDate(selectedDate).length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          textAlign='center'
                          component='span'
                        >
                          No appointments scheduled for this date
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* All Appointments Table */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                All Upcoming Appointments
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>{appointment.duration} min</TableCell>
                        <TableCell>
                          <Chip
                            label={appointment.status}
                            color={getStatusColor(appointment.status)}
                            size='small'
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size='small'>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size='small'
                            color='error'
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
                          >
                            <DeleteIcon />
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

      {/* Add Appointment Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>
          <Box display='flex' alignItems='center' gap={1}>
            <ScheduleIcon />
            Schedule New Appointment
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box display='flex' flexDirection='column' gap={2} mt={1}>
            <TextField
              label='Patient Name'
              value={formData.patientName}
              onChange={(e) =>
                setFormData({ ...formData, patientName: e.target.value })
              }
              fullWidth
            />
            <TextField
              label='Date'
              type='date'
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Time</InputLabel>
              <Select
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                label='Time'
              >
                {getAvailableSlots(formData.date).map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Appointment Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                label='Appointment Type'
              >
                <MenuItem value='Consultation'>Consultation</MenuItem>
                <MenuItem value='Follow-up'>Follow-up</MenuItem>
                <MenuItem value='Surgery Consultation'>
                  Surgery Consultation
                </MenuItem>
                <MenuItem value='Emergency'>Emergency</MenuItem>
                <MenuItem value='Routine Check'>Routine Check</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Duration (minutes)</InputLabel>
              <Select
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                label='Duration (minutes)'
              >
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={45}>45 minutes</MenuItem>
                <MenuItem value={60}>60 minutes</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Notes'
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveAppointment} variant='contained'>
            Schedule Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
