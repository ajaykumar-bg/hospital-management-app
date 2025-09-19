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
  LocalHospital as DoctorIcon,
  EventNote as AppointmentIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  MedicalServices as MedicalIcon,
  Payment as PaymentIcon,
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
  ];

  // Role-specific navigation items
  const roleSpecificItems = {
    admin: [
      { label: 'Patients', path: '/patients', icon: <PeopleIcon /> },
      { label: 'Doctors', path: '/doctors', icon: <DoctorIcon /> },
      {
        label: 'Appointments',
        path: '/appointments',
        icon: <AppointmentIcon />,
      },
      {
        label: 'Configuration',
        path: '/configuration',
        icon: <SettingsIcon />,
      },
    ],
    staff: [
      { label: 'Patients', path: '/patients', icon: <PeopleIcon /> },
      {
        label: 'Appointments',
        path: '/appointments',
        icon: <AppointmentIcon />,
      },
      { label: 'Doctors', path: '/doctors', icon: <DoctorIcon /> },
    ],
    doctor: [
      { label: 'My Patients', path: '/patients', icon: <PeopleIcon /> },
      {
        label: 'Appointments',
        path: '/appointments',
        icon: <AppointmentIcon />,
      },
      {
        label: 'Medical Records',
        path: '/medical-records',
        icon: <MedicalIcon />,
      },
    ],
    nurse: [
      { label: 'Patients', path: '/patients', icon: <PeopleIcon /> },
      {
        label: 'Appointments',
        path: '/appointments',
        icon: <AppointmentIcon />,
      },
      {
        label: 'Medical Tasks',
        path: '/medical-tasks',
        icon: <AssignmentIcon />,
      },
    ],
    patient: [
      {
        label: 'My Appointments',
        path: '/appointments',
        icon: <AppointmentIcon />,
      },
      {
        label: 'Medical Records',
        path: '/medical-records',
        icon: <MedicalIcon />,
      },
      { label: 'Billing', path: '/billing', icon: <PaymentIcon /> },
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
