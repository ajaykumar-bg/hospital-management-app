import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import UserInformation from './UserInformation';
import ThemeSelector from './ThemeSelector';
import AdditionalSettings from './AdditionalSettings';
import { settingsPageInfo } from './constants';

const Settings = () => {
  return (
    <Box>
      <Box display='flex' alignItems='center' gap={2} mb={3}>
        <SettingsIcon color='primary' sx={{ fontSize: 32 }} />
        <Typography variant='h4' gutterBottom>
          {settingsPageInfo.title}
        </Typography>
      </Box>

      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        {settingsPageInfo.subtitle}
      </Typography>

      <Grid container spacing={3}>
        {/* User Information */}
        <Grid size={{ xs: 12, md: 4 }}>
          <UserInformation />
        </Grid>

        {/* Theme Settings */}
        <Grid size={{ xs: 12, md: 8 }}>
          <ThemeSelector />
        </Grid>

        {/* Additional Settings Placeholder */}
        <Grid size={{ xs: 12 }}>
          <AdditionalSettings />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
