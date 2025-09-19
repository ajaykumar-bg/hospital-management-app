import React from 'react';
import {
  Paper,
  Typography,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  SupervisorAccount as ManageUsersIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  FolderShared as PatientRecordsIcon,
  EventNote as AppointmentIcon,
  LocalPharmacy as PrescriptionIcon,
  MedicalServices as PatientCareIcon,
  Schedule as MedicationIcon,
  MonitorHeart as VitalSignsIcon,
  PersonAdd as RegistrationIcon,
  AccountBalance as InsuranceIcon,
  Payment as PaymentIcon,
  Visibility as ViewResultsIcon,
} from '@mui/icons-material';

function QuickActions(props) {
  const { user } = props;

  const handleActionClick = (action) => {
    console.log(`${action} clicked for ${user.role}`);
    // Here you would implement the actual navigation or action
  };

  const getActionsForRole = (role) => {
    const actions = {
      admin: [
        {
          text: 'Manage Users',
          icon: <ManageUsersIcon />,
          action: 'manage-users',
        },
        {
          text: 'System Reports',
          icon: <ReportsIcon />,
          action: 'system-reports',
        },
        {
          text: 'Hospital Settings',
          icon: <SettingsIcon />,
          action: 'hospital-settings',
        },
      ],
      doctor: [
        {
          text: 'View Patient Records',
          icon: <PatientRecordsIcon />,
          action: 'patient-records',
        },
        {
          text: 'Schedule Appointments',
          icon: <AppointmentIcon />,
          action: 'schedule-appointments',
        },
        {
          text: 'Write Prescriptions',
          icon: <PrescriptionIcon />,
          action: 'write-prescriptions',
        },
      ],
      nurse: [
        {
          text: 'Patient Care Tasks',
          icon: <PatientCareIcon />,
          action: 'patient-care',
        },
        {
          text: 'Medication Schedule',
          icon: <MedicationIcon />,
          action: 'medication-schedule',
        },
        {
          text: 'Vital Signs Entry',
          icon: <VitalSignsIcon />,
          action: 'vital-signs',
        },
      ],
      staff: [
        {
          text: 'Appointment Management',
          icon: <AppointmentIcon />,
          action: 'appointment-management',
        },
        {
          text: 'Patient Registration',
          icon: <RegistrationIcon />,
          action: 'patient-registration',
        },
        {
          text: 'Insurance Processing',
          icon: <InsuranceIcon />,
          action: 'insurance-processing',
        },
      ],
      patient: [
        {
          text: 'Book Appointment',
          icon: <AppointmentIcon />,
          action: 'book-appointment',
        },
        {
          text: 'View Test Results',
          icon: <ViewResultsIcon />,
          action: 'view-results',
        },
        { text: 'Pay Bills', icon: <PaymentIcon />, action: 'pay-bills' },
      ],
    };
    return actions[role] || [];
  };

  const currentActions = getActionsForRole(user.role);
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Quick Actions
      </Typography>
      <MenuList dense>
        {currentActions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => handleActionClick(action.action)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{action.icon}</ListItemIcon>
            <ListItemText primary={action.text} />
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}

export default QuickActions;
