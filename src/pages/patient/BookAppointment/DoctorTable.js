import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Button,
  Rating,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Star as StarIcon,
  Schedule as ScheduleIcon,
  Info as InfoIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';

const DoctorTable = ({
  doctors,
  onBookAppointment,
  onViewDetails,
  selectedSpecialty = 'All Specialties',
  favorites = [],
  onToggleFavorite,
}) => {
  const filteredDoctors =
    selectedSpecialty === 'All Specialties'
      ? doctors
      : doctors.filter((doctor) => doctor.specialty === selectedSpecialty);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const isFavorite = (doctorId) => {
    return favorites.includes(doctorId);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Doctor</TableCell>
            <TableCell>Specialty</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Next Available</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDoctors.map((doctor) => (
            <TableRow key={doctor.id} hover>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={doctor.avatar} alt={doctor.name}>
                    {doctor.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant='subtitle2' fontWeight='bold'>
                      {doctor.name}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {doctor.qualifications[0]}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={doctor.specialty}
                  size='small'
                  color='primary'
                  variant='outlined'
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating
                    value={doctor.rating}
                    precision={0.1}
                    readOnly
                    size='small'
                    icon={<StarIcon fontSize='small' />}
                  />
                  <Typography variant='body2'>{doctor.rating}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>
                  {doctor.experience} years
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' fontWeight='bold' color='primary'>
                  ${doctor.consultationFee}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon fontSize='small' color='action' />
                  <Typography variant='body2'>
                    {formatDate(doctor.nextAvailable)}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align='center'>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Tooltip
                    title={
                      isFavorite(doctor.id)
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >
                    <IconButton
                      size='small'
                      onClick={() => onToggleFavorite(doctor.id)}
                      color={isFavorite(doctor.id) ? 'error' : 'default'}
                    >
                      {isFavorite(doctor.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='View details'>
                    <IconButton
                      size='small'
                      onClick={() => onViewDetails(doctor)}
                      color='info'
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => onBookAppointment(doctor)}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    Book
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredDoctors.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='body1' color='text.secondary'>
            No doctors found for the selected specialty.
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};

export default DoctorTable;
