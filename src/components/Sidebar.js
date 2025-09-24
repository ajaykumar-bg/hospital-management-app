import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  EventNote as AppointmentIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  MedicalServices as MedicalIcon,
  Schedule as MedicationIcon,
  MonitorHeart as VitalSignsIcon,
  Payment as PaymentIcon,
  Business as HospitalIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  // Base navigation items available to all users
  const baseItems = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { label: 'Profile', path: '/profile', icon: <ProfileIcon /> },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  // Role-specific navigation items based on QuickActions
  const roleSpecificItems = {
    admin: [
      {
        label: 'Manage Users',
        path: '/admin/manage-users',
        icon: <PeopleIcon />,
      },
      {
        label: 'System Reports',
        path: '/admin/system-reports',
        icon: <AssignmentIcon />,
      },
      {
        label: 'Hospital Settings',
        path: '/admin/hospital-settings',
        icon: <HospitalIcon />,
      },
      {
        label: 'Configuration',
        path: '/configuration',
        icon: <AssignmentIcon />,
      },
    ],
    staff: [
      {
        label: 'Appointment Management',
        path: '/staff/appointment-management',
        icon: <AppointmentIcon />,
      },
      {
        label: 'Patient Registration',
        path: '/staff/patient-registration',
        icon: <PeopleIcon />,
      },
      {
        label: 'Insurance Processing',
        path: '/staff/insurance-processing',
        icon: <PaymentIcon />,
      },
    ],
    doctor: [
      {
        label: 'Patient Records',
        path: '/doctor/patient-records',
        icon: <MedicalIcon />,
      },
      {
        label: 'Schedule Appointments',
        path: '/doctor/schedule-appointments',
        icon: <AppointmentIcon />,
      },
      {
        label: 'Write Prescriptions',
        path: '/doctor/write-prescriptions',
        icon: <MedicalIcon />,
      },
    ],
    nurse: [
      {
        label: 'Patient Care Tasks',
        path: '/nurse/patient-care-tasks',
        icon: <MedicalIcon />,
      },
      {
        label: 'Medication Schedule',
        path: '/nurse/medication-schedule',
        icon: <MedicationIcon />,
      },
      {
        label: 'Vital Signs Entry',
        path: '/nurse/vital-signs',
        icon: <VitalSignsIcon />,
      },
    ],
    patient: [
      {
        label: 'Book Appointment',
        path: '/patient/book-appointment',
        icon: <AppointmentIcon />,
      },
      {
        label: 'View Test Results',
        path: '/patient/view-test-results',
        icon: <MedicalIcon />,
      },
      {
        label: 'Pay Bills',
        path: '/patient/pay-bills',
        icon: <PaymentIcon />,
      },
    ],
  };

  // Combine base items with role-specific items
  const navigationItems = [
    ...baseItems,
    ...(roleSpecificItems[user.role] || []),
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    onClose();
  };

  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Navigation
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Menu
          </Typography>
        </Box>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? 'primary.main'
                        : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight:
                        location.pathname === item.path ? 'bold' : 'normal',
                      color:
                        location.pathname === item.path
                          ? 'primary.main'
                          : 'inherit',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
