import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const SecuritySettings = ({
  settings,
  editMode,
  onToggleEdit,
  onSave,
  onInputChange,
  onSwitchChange,
}) => {
  return (
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
          <IconButton onClick={() => onToggleEdit('security')}>
            {editMode.security ? (
              <SaveIcon onClick={() => onSave('security')} />
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
                onInputChange(
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
                onInputChange(
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
                onInputChange(
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
                    onSwitchChange(
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
                    onSwitchChange('security', 'auditLogging', e.target.checked)
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
  );
};

export default SecuritySettings;
