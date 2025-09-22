import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalHospital as HospitalIcon,
} from '@mui/icons-material';
import DoctorTable from './DoctorTable';
import BookingDialog from './BookingDialog';
import { mockDoctors, specialties } from './constants';

const BookAppointment = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSpecialty =
      selectedSpecialty === 'All Specialties' ||
      doctor.specialty === selectedSpecialty;
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingDialogOpen(true);
  };

  const handleViewDetails = (doctor) => {
    setSnackbar({
      open: true,
      message: `Viewing details for ${doctor.name}`,
      severity: 'info',
    });
  };

  const handleToggleFavorite = (doctorId) => {
    setFavorites((prev) => {
      const isFavorite = prev.includes(doctorId);
      if (isFavorite) {
        setSnackbar({
          open: true,
          message: 'Doctor removed from favorites',
          severity: 'info',
        });
        return prev.filter((id) => id !== doctorId);
      } else {
        setSnackbar({
          open: true,
          message: 'Doctor added to favorites',
          severity: 'success',
        });
        return [...prev, doctorId];
      }
    });
  };

  const handleConfirmBooking = (appointmentData) => {
    console.log('Booking confirmed:', appointmentData);
    setSnackbar({
      open: true,
      message: `Appointment booked successfully with ${appointmentData.doctor.name}`,
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <HospitalIcon fontSize='large' color='primary' />
        <Typography variant='h4' component='h1' fontWeight='bold'>
          Book Appointment
        </Typography>
      </Box>

      <Alert severity='info' sx={{ mb: 3 }}>
        Select a doctor and book your appointment. You can filter by specialty
        or search by doctor name.
      </Alert>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Specialty</InputLabel>
            <Select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              label='Specialty'
            >
              {specialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Search Doctors'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder='Search by doctor name or specialty...'
          />
        </Grid>
      </Grid>

      <Typography variant='h6' gutterBottom>
        Available Doctors ({filteredDoctors.length})
      </Typography>

      <DoctorTable
        doctors={filteredDoctors}
        onBookAppointment={handleBookAppointment}
        onViewDetails={handleViewDetails}
        selectedSpecialty={selectedSpecialty}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      <BookingDialog
        open={bookingDialogOpen}
        onClose={() => setBookingDialogOpen(false)}
        doctor={selectedDoctor}
        onConfirmBooking={handleConfirmBooking}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookAppointment;
