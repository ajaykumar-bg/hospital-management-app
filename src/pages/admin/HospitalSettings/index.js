import React, { useState } from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import SystemConfiguration from './SystemConfiguration';
import SystemStatus from './SystemStatus';

const mockSettings = {
  general: {
    hospitalName: 'City General Hospital',
    address: '123 Medical Center Dr, Healthcare City, HC 12345',
    phone: '+1-234-567-8900',
    email: 'info@citygeneral.com',
    timezone: 'UTC-05:00 (Eastern Time)',
  },
  security: {
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    twoFactorAuth: true,
    auditLogging: true,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    systemAlerts: true,
  },
  system: {
    backupFrequency: 'Daily',
    maintenanceWindow: '02:00 - 04:00',
    maxFileSize: '10MB',
    retentionPeriod: '7 years',
  },
};

export default function HospitalSettings() {
  const [settings, setSettings] = useState(mockSettings);
  const [editMode, setEditMode] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggleEdit = (section) => {
    setEditMode({ ...editMode, [section]: !editMode[section] });
  };

  const handleSave = (section) => {
    console.log(`Saving ${section} settings:`, settings[section]);
    setEditMode({ ...editMode, [section]: false });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (section, field, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    });
  };

  const handleSwitchChange = (section, field, checked) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: checked,
      },
    });
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Hospital Settings
      </Typography>

      {showSuccess && (
        <Alert severity='success' sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <GeneralSettings
            settings={settings}
            editMode={editMode}
            onToggleEdit={handleToggleEdit}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
        </Grid>

        {/* Security Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SecuritySettings
            settings={settings}
            editMode={editMode}
            onToggleEdit={handleToggleEdit}
            onSave={handleSave}
            onInputChange={handleInputChange}
            onSwitchChange={handleSwitchChange}
          />
        </Grid>

        {/* Notification Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <NotificationSettings
            settings={settings}
            onSave={handleSave}
            onSwitchChange={handleSwitchChange}
          />
        </Grid>

        {/* System Configuration */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SystemConfiguration
            settings={settings}
            editMode={editMode}
            onToggleEdit={handleToggleEdit}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
        </Grid>

        {/* System Status */}
        <Grid size={{ xs: 12 }}>
          <SystemStatus />
        </Grid>
      </Grid>
    </Box>
  );
}
