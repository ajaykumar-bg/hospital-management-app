import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const GeneralSettings = ({
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
          <Typography variant='h6'>General Information</Typography>
          <IconButton onClick={() => onToggleEdit('general')}>
            {editMode.general ? (
              <SaveIcon onClick={() => onSave('general')} />
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
                onInputChange('general', 'hospitalName', e.target.value)
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
                onInputChange('general', 'address', e.target.value)
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
                onInputChange('general', 'phone', e.target.value)
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
                onInputChange('general', 'email', e.target.value)
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
                onInputChange('general', 'timezone', e.target.value)
              }
              disabled={!editMode.general}
              fullWidth
              variant={editMode.general ? 'outlined' : 'filled'}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
