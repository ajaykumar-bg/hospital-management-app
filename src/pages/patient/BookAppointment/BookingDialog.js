import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Alert,
  Avatar,
  Divider,
} from '@mui/material';
import {
  appointmentTypes,
  timeSlots,
  paymentMethods,
  formValidation,
} from './constants';

const steps = [
  'Select Date & Time',
  'Appointment Details',
  'Payment & Confirmation',
];

const BookingDialog = ({ open, onClose, doctor, onConfirmBooking }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    appointmentDate: '',
    timeSlot: '',
    appointmentType: 'consultation',
    reason: '',
    symptoms: '',
    paymentMethod: 'card',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      appointmentDate: '',
      timeSlot: '',
      appointmentType: 'consultation',
      reason: '',
      symptoms: '',
      paymentMethod: 'card',
      notes: '',
    });
    setErrors({});
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.appointmentDate) {
          newErrors.appointmentDate = 'Date is required';
        }
        if (!formData.timeSlot) {
          newErrors.timeSlot = 'Time slot is required';
        }
        break;
      case 1:
        if (
          !formData.reason ||
          formData.reason.length < formValidation.reason.minLength
        ) {
          newErrors.reason = `Reason must be at least ${formValidation.reason.minLength} characters`;
        }
        break;
      case 2:
        if (!formData.paymentMethod) {
          newErrors.paymentMethod = 'Payment method is required';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleConfirm = () => {
    if (validateStep(2)) {
      const appointmentData = {
        ...formData,
        doctor,
        appointmentId: `APT-${Date.now()}`,
        status: 'PENDING',
        createdAt: new Date(),
      };
      onConfirmBooking(appointmentData);
      handleReset();
      onClose();
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const renderDateTimeStep = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Appointment Date'
            type='date'
            value={formData.appointmentDate}
            onChange={(e) =>
              handleInputChange('appointmentDate', e.target.value)
            }
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: getMinDate() }}
            error={!!errors.appointmentDate}
            helperText={errors.appointmentDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.timeSlot}>
            <InputLabel>Time Slot</InputLabel>
            <Select
              value={formData.timeSlot}
              onChange={(e) => handleInputChange('timeSlot', e.target.value)}
              label='Time Slot'
            >
              {timeSlots.map((slot) => (
                <MenuItem key={slot.id} value={slot.value}>
                  {slot.time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Appointment Type</InputLabel>
            <Select
              value={formData.appointmentType}
              onChange={(e) =>
                handleInputChange('appointmentType', e.target.value)
              }
              label='Appointment Type'
            >
              {appointmentTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label} ({type.duration} min)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );

  const renderDetailsStep = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Reason for Visit'
            multiline
            rows={3}
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            error={!!errors.reason}
            helperText={
              errors.reason ||
              `${formData.reason.length}/${formValidation.reason.maxLength} characters`
            }
            inputProps={{ maxLength: formValidation.reason.maxLength }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Symptoms (Optional)'
            multiline
            rows={3}
            value={formData.symptoms}
            onChange={(e) => handleInputChange('symptoms', e.target.value)}
            helperText={`${formData.symptoms.length}/${formValidation.symptoms.maxLength} characters`}
            inputProps={{ maxLength: formValidation.symptoms.maxLength }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Additional Notes (Optional)'
            multiline
            rows={2}
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentStep = () => (
    <Box sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' gutterBottom>
          Appointment Summary
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar src={doctor?.avatar}>{doctor?.name?.charAt(0)}</Avatar>
          <Box>
            <Typography variant='subtitle1' fontWeight='bold'>
              {doctor?.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {doctor?.specialty}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary'>
              Date:
            </Typography>
            <Typography variant='body1'>{formData.appointmentDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary'>
              Time:
            </Typography>
            <Typography variant='body1'>
              {timeSlots.find((slot) => slot.value === formData.timeSlot)?.time}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary'>
              Type:
            </Typography>
            <Typography variant='body1'>
              {
                appointmentTypes.find(
                  (type) => type.value === formData.appointmentType
                )?.label
              }
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary'>
              Fee:
            </Typography>
            <Typography variant='body1' fontWeight='bold' color='primary'>
              ${doctor?.consultationFee}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant='h6' gutterBottom>
        Payment Method
      </Typography>
      <RadioGroup
        value={formData.paymentMethod}
        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
      >
        {paymentMethods.map((method) => (
          <FormControlLabel
            key={method.id}
            value={method.id}
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span className='material-icons'>{method.icon}</span>
                {method.label}
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </Box>
  );

  if (!doctor) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && renderDateTimeStep()}
        {activeStep === 1 && renderDetailsStep()}
        {activeStep === 2 && renderPaymentStep()}

        {activeStep === steps.length && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Alert severity='success' sx={{ mb: 2 }}>
              Appointment booked successfully! You will receive a confirmation
              email shortly.
            </Alert>
            <Button onClick={handleReset}>Book Another Appointment</Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant='contained'>
            Next
          </Button>
        ) : (
          <Button onClick={handleConfirm} variant='contained'>
            Confirm Booking
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog;
