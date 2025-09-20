import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { additionalSettingsFeatures, settingsPageInfo } from './constants';

const AdditionalSettings = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {settingsPageInfo.additionalTitle}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {settingsPageInfo.additionalDescription}
        </Typography>
        <Box mt={2} display='flex' flexWrap='wrap' gap={1}>
          {additionalSettingsFeatures.map((feature) => (
            <Chip
              key={feature.label}
              label={feature.label}
              variant='outlined'
              size='small'
              title={feature.description}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdditionalSettings;
