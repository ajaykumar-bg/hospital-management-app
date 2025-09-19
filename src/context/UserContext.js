import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Mock user data - in real app this would come from authentication
  const [user, setUser] = useState({
    id: '1',
    name: 'Dr. Ajay Girija',
    email: 'ajay.girija@hospital.com',
    role: 'admin', // 'admin', 'staff', 'doctor', 'nurse', 'patient'
    department: 'Administration',
    phone: '+1-234-567-8900',
    address: '123 Medical Center Dr, Healthcare City, HC 12345',
  });

  // Define permissions and access levels based on role
  const permissions = {
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

  const userPermissions = permissions[user.role] || permissions.patient;

  const switchRole = (newRole) => {
    // Update user data based on role
    const roleData = {
      admin: { name: 'Admin User', department: 'Administration' },
      staff: { name: 'Staff Member', department: 'General Staff' },
      doctor: { name: 'Dr. John Smith', department: 'Cardiology' },
      nurse: { name: 'Nurse Sarah Johnson', department: 'Emergency' },
      patient: { name: 'Patient Michael Brown', department: 'N/A' },
    };

    setUser((prev) => ({
      ...prev,
      role: newRole,
      name: roleData[newRole]?.name || prev.name,
      department: roleData[newRole]?.department || prev.department,
    }));
  };

  const value = {
    user,
    permissions: userPermissions,
    switchRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
