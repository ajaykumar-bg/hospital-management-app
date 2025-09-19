import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

const SystemConfiguration = ({
  settings,
  editMode,
  onToggleEdit,
  onSave,
  onInputChange,
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
            <StorageIcon /> System Configuration
          </Typography>
          <IconButton onClick={() => onToggleEdit('system')}>
            {editMode.system ? (
              <SaveIcon onClick={() => onSave('system')} />
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
                onInputChange('system', 'backupFrequency', e.target.value)
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
                onInputChange('system', 'maintenanceWindow', e.target.value)
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
                onInputChange('system', 'maxFileSize', e.target.value)
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
                onInputChange('system', 'retentionPeriod', e.target.value)
              }
              disabled={!editMode.system}
              fullWidth
              variant={editMode.system ? 'outlined' : 'filled'}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button variant='outlined' startIcon={<RefreshIcon />} fullWidth>
            Run System Diagnostics
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SystemConfiguration;
