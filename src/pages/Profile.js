import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  Card,
  CardContent,
  Chip,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    department: user.department,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      department: user.department,
    });
    setIsEditing(false);
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'error',
      staff: 'info',
      doctor: 'success',
      nurse: 'primary',
      patient: 'secondary',
    };
    return colors[role] || 'default';
  };

  const getRolePermissions = (role) => {
    const rolePermissions = {
      admin: [
        'Full System Access',
        'User Management',
        'Reports & Analytics',
        'System Configuration',
      ],
      staff: [
        'Patient Management',
        'Appointment Scheduling',
        'Basic Reports',
        'Insurance Processing',
      ],
      doctor: [
        'Patient Records',
        'Prescription Management',
        'Medical Reports',
        'Appointment Management',
      ],
      nurse: [
        'Patient Care',
        'Medication Administration',
        'Vital Signs',
        'Basic Documentation',
      ],
      patient: [
        'Personal Health Records',
        'Appointment Booking',
        'Test Results',
        'Bill Payments',
      ],
    };
    return rolePermissions[role] || [];
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        User Profile
      </Typography>

      {showSuccess && (
        <Alert severity='success' sx={{ mb: 2 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Info Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                <PersonIcon sx={{ fontSize: 50 }} />
              </Avatar>
              <Typography variant='h5' gutterBottom>
                {user.name}
              </Typography>
              <Chip
                label={user.role.toUpperCase()}
                color={getRoleColor(user.role)}
                sx={{ mb: 2 }}
              />
              <Typography variant='body2' color='textSecondary'>
                {user.department}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                ID: {user.id}
              </Typography>
            </CardContent>
          </Card>

          {/* Role Permissions Card */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Permissions
              </Typography>
              <Box>
                {getRolePermissions(user.role).map((permission, index) => (
                  <Typography key={index} variant='body2' sx={{ mb: 0.5 }}>
                    • {permission}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={3}
            >
              <Typography variant='h6'>Personal Information</Typography>
              {!isEditing ? (
                <Button
                  startIcon={<EditIcon />}
                  variant='outlined'
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box>
                  <Button
                    startIcon={<SaveIcon />}
                    variant='contained'
                    onClick={handleSave}
                    sx={{ mr: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    variant='outlined'
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Full Name'
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Email'
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Phone Number'
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Department'
                  value={formData.department}
                  onChange={handleInputChange('department')}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Address'
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>

            {/* Additional Role-Specific Information */}
            <Box sx={{ mt: 4 }}>
              <Typography variant='h6' gutterBottom>
                Role-Specific Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {user.role === 'doctor' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Medical License'
                      value='MD-12345'
                      disabled
                      variant='filled'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Specialization'
                      value='Cardiology'
                      disabled
                      variant='filled'
                    />
                  </Grid>
                </Grid>
              )}

              {user.role === 'nurse' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Nursing License'
                      value='RN-67890'
                      disabled
                      variant='filled'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Certification Level'
                      value='Registered Nurse'
                      disabled
                      variant='filled'
                    />
                  </Grid>
                </Grid>
              )}

              {user.role === 'patient' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Patient ID'
                      value='PT-001234'
                      disabled
                      variant='filled'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Insurance Provider'
                      value='HealthCare Plus'
                      disabled
                      variant='filled'
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
