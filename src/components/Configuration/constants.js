import {
  AdminPanelSettings as AdminIcon,
  LocalHospital as DoctorIcon,
  MedicalServices as NurseIcon,
  Business as StaffIcon,
  PersonOutline as PatientIcon,
} from '@mui/icons-material';

export const permissionLabels = {
  canManageUsers: 'Manage Users',
  canViewAllPatients: 'View All Patients',
  canManageSystem: 'System Management',
  canViewReports: 'View Reports',
  canManageAppointments: 'Manage Appointments',
};

export const roleConfig = {
  admin: { color: 'error', icon: <AdminIcon /> },
  staff: { color: 'info', icon: <StaffIcon /> },
  doctor: { color: 'success', icon: <DoctorIcon /> },
  nurse: { color: 'primary', icon: <NurseIcon /> },
  patient: { color: 'secondary', icon: <PatientIcon /> },
};

export const allRolePermissions = {
  admin: {
    canManageUsers: true,
    canViewAllPatients: true,
    canManageSystem: true,
    canViewReports: true,
    canManageAppointments: true,
  },
  staff: {
    canManageUsers: false,
    canViewAllPatients: true,
    canManageSystem: false,
    canViewReports: true,
    canManageAppointments: true,
  },
  doctor: {
    canManageUsers: false,
    canViewAllPatients: true,
    canManageSystem: false,
    canViewReports: true,
    canManageAppointments: true,
  },
  nurse: {
    canManageUsers: false,
    canViewAllPatients: true,
    canManageSystem: false,
    canViewReports: false,
    canManageAppointments: true,
  },
  patient: {
    canManageUsers: false,
    canViewAllPatients: false,
    canManageSystem: false,
    canViewReports: false,
    canManageAppointments: false,
  },
};
