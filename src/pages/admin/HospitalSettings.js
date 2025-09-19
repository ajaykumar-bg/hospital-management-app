import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

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
          <Card>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mb={2}
              >
                <Typography variant='h6'>General Information</Typography>
                <IconButton onClick={() => handleToggleEdit('general')}>
                  {editMode.general ? (
                    <SaveIcon onClick={() => handleSave('general')} />
                  ) : (
                    <EditIcon />
                  )}
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Hospital Name'
                    value={settings.general.hospitalName}
                    onChange={(e) =>
                      handleInputChange(
                        'general',
                        'hospitalName',
                        e.target.value
                      )
                    }
                    disabled={!editMode.general}
                    fullWidth
                    variant={editMode.general ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Address'
                    value={settings.general.address}
                    onChange={(e) =>
                      handleInputChange('general', 'address', e.target.value)
                    }
                    disabled={!editMode.general}
                    fullWidth
                    multiline
                    rows={2}
                    variant={editMode.general ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label='Phone'
                    value={settings.general.phone}
                    onChange={(e) =>
                      handleInputChange('general', 'phone', e.target.value)
                    }
                    disabled={!editMode.general}
                    fullWidth
                    variant={editMode.general ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label='Email'
                    value={settings.general.email}
                    onChange={(e) =>
                      handleInputChange('general', 'email', e.target.value)
                    }
                    disabled={!editMode.general}
                    fullWidth
                    variant={editMode.general ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Timezone'
                    value={settings.general.timezone}
                    onChange={(e) =>
                      handleInputChange('general', 'timezone', e.target.value)
                    }
                    disabled={!editMode.general}
                    fullWidth
                    variant={editMode.general ? 'outlined' : 'filled'}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mb={2}
              >
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <SecurityIcon /> Security Settings
                </Typography>
                <IconButton onClick={() => handleToggleEdit('security')}>
                  {editMode.security ? (
                    <SaveIcon onClick={() => handleSave('security')} />
                  ) : (
                    <EditIcon />
                  )}
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label='Password Expiry (days)'
                    type='number'
                    value={settings.security.passwordExpiry}
                    onChange={(e) =>
                      handleInputChange(
                        'security',
                        'passwordExpiry',
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!editMode.security}
                    fullWidth
                    variant={editMode.security ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label='Max Login Attempts'
                    type='number'
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) =>
                      handleInputChange(
                        'security',
                        'maxLoginAttempts',
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!editMode.security}
                    fullWidth
                    variant={editMode.security ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Session Timeout (minutes)'
                    type='number'
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      handleInputChange(
                        'security',
                        'sessionTimeout',
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!editMode.security}
                    fullWidth
                    variant={editMode.security ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) =>
                          handleSwitchChange(
                            'security',
                            'twoFactorAuth',
                            e.target.checked
                          )
                        }
                        disabled={!editMode.security}
                      />
                    }
                    label='Two-Factor Authentication'
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.security.auditLogging}
                        onChange={(e) =>
                          handleSwitchChange(
                            'security',
                            'auditLogging',
                            e.target.checked
                          )
                        }
                        disabled={!editMode.security}
                      />
                    }
                    label='Audit Logging'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mb={2}
              >
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <NotificationsIcon /> Notifications
                </Typography>
                <IconButton onClick={() => handleSave('notifications')}>
                  <SaveIcon />
                </IconButton>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary='Email Notifications' />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) =>
                        handleSwitchChange(
                          'notifications',
                          'emailNotifications',
                          e.target.checked
                        )
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary='SMS Notifications' />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) =>
                        handleSwitchChange(
                          'notifications',
                          'smsNotifications',
                          e.target.checked
                        )
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary='Push Notifications' />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) =>
                        handleSwitchChange(
                          'notifications',
                          'pushNotifications',
                          e.target.checked
                        )
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary='Appointment Reminders' />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.notifications.appointmentReminders}
                      onChange={(e) =>
                        handleSwitchChange(
                          'notifications',
                          'appointmentReminders',
                          e.target.checked
                        )
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary='System Alerts' />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={settings.notifications.systemAlerts}
                      onChange={(e) =>
                        handleSwitchChange(
                          'notifications',
                          'systemAlerts',
                          e.target.checked
                        )
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* System Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mb={2}
              >
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <StorageIcon /> System Configuration
                </Typography>
                <IconButton onClick={() => handleToggleEdit('system')}>
                  {editMode.system ? (
                    <SaveIcon onClick={() => handleSave('system')} />
                  ) : (
                    <EditIcon />
                  )}
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Backup Frequency'
                    value={settings.system.backupFrequency}
                    onChange={(e) =>
                      handleInputChange(
                        'system',
                        'backupFrequency',
                        e.target.value
                      )
                    }
                    disabled={!editMode.system}
                    fullWidth
                    variant={editMode.system ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Maintenance Window'
                    value={settings.system.maintenanceWindow}
                    onChange={(e) =>
                      handleInputChange(
                        'system',
                        'maintenanceWindow',
                        e.target.value
                      )
                    }
                    disabled={!editMode.system}
                    fullWidth
                    variant={editMode.system ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label='Max File Size'
                    value={settings.system.maxFileSize}
                    onChange={(e) =>
                      handleInputChange('system', 'maxFileSize', e.target.value)
                    }
                    disabled={!editMode.system}
                    fullWidth
                    variant={editMode.system ? 'outlined' : 'filled'}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label='Data Retention Period'
                    value={settings.system.retentionPeriod}
                    onChange={(e) =>
                      handleInputChange(
                        'system',
                        'retentionPeriod',
                        e.target.value
                      )
                    }
                    disabled={!editMode.system}
                    fullWidth
                    variant={editMode.system ? 'outlined' : 'filled'}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant='outlined'
                  startIcon={<RefreshIcon />}
                  fullWidth
                >
                  Run System Diagnostics
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                System Status
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Box textAlign='center'>
                    <Typography variant='body2' color='textSecondary'>
                      Database
                    </Typography>
                    <Chip label='Online' color='success' />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Box textAlign='center'>
                    <Typography variant='body2' color='textSecondary'>
                      API Services
                    </Typography>
                    <Chip label='Online' color='success' />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Box textAlign='center'>
                    <Typography variant='body2' color='textSecondary'>
                      Backup System
                    </Typography>
                    <Chip label='Online' color='success' />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Box textAlign='center'>
                    <Typography variant='body2' color='textSecondary'>
                      Email Service
                    </Typography>
                    <Chip label='Warning' color='warning' />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
