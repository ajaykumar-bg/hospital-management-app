import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Divider,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  LightMode,
  DarkMode,
  Palette,
} from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const Settings = () => {
  const { mode, setTheme } = useThemeMode();
  const { user } = useUser();

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const themeOptions = [
    {
      value: 'light',
      label: 'Light Mode',
      description: 'Clean, bright interface with high contrast',
      icon: <LightMode color='primary' />,
      preview: '#ffffff',
      textColor: '#000000',
    },
    {
      value: 'dark',
      label: 'Dark Mode',
      description: 'Dark background for reduced eye strain',
      icon: <DarkMode color='primary' />,
      preview: '#121212',
      textColor: '#ffffff',
    },
    {
      value: 'purple',
      label: 'Purple Theme',
      description: 'Elegant purple design for medical professionals',
      icon: <Palette color='primary' />,
      preview: '#7f4a9b',
      textColor: '#ffffff',
    },
  ];

  return (
    <Box>
      <Box display='flex' alignItems='center' gap={2} mb={3}>
        <SettingsIcon color='primary' sx={{ fontSize: 32 }} />
        <Typography variant='h4' gutterBottom>
          Settings
        </Typography>
      </Box>

      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        Customize your Hospital Management System experience
      </Typography>

      <Grid container spacing={3}>
        {/* User Information */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                User Information
              </Typography>
              <Box display='flex' alignItems='center' gap={2} mb={2}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: 'primary.main',
                    fontSize: '1.25rem',
                  }}
                >
                  {user.name
                    .split(' ')
                    .map((word) => word.charAt(0))
                    .join('')
                    .substring(0, 2)}
                </Avatar>
                <Box>
                  <Typography variant='subtitle1' fontWeight='medium'>
                    {user.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {user.email}
                  </Typography>
                  <Chip
                    label={user.role.toUpperCase()}
                    size='small'
                    color='primary'
                    variant='outlined'
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant='body2' color='text.secondary'>
                <strong>Department:</strong> {user.department}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>Phone:</strong> {user.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Theme Settings */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Appearance Settings
              </Typography>
              <Typography variant='body2' color='text.secondary' mb={3}>
                Choose your preferred theme for the best visual experience
              </Typography>

              <FormControl component='fieldset' fullWidth>
                <FormLabel
                  component='legend'
                  sx={{ mb: 2, fontWeight: 'medium' }}
                >
                  Skin Mode
                </FormLabel>
                <RadioGroup
                  value={mode}
                  onChange={handleThemeChange}
                  sx={{ gap: 2 }}
                >
                  {themeOptions.map((option) => (
                    <Paper
                      key={option.value}
                      variant='outlined'
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: mode === option.value ? 2 : 1,
                        borderColor:
                          mode === option.value ? 'primary.main' : 'divider',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'action.hover',
                        },
                      }}
                      onClick={() => setTheme(option.value)}
                    >
                      <FormControlLabel
                        value={option.value}
                        control={<Radio />}
                        sx={{ width: '100%', m: 0 }}
                        label={
                          <Box
                            display='flex'
                            alignItems='center'
                            gap={2}
                            width='100%'
                          >
                            <Box
                              display='flex'
                              alignItems='center'
                              justifyContent='center'
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                bgcolor: option.preview,
                                color: option.textColor,
                                border: '1px solid',
                                borderColor: 'divider',
                              }}
                            >
                              {option.icon}
                            </Box>
                            <Box flex={1}>
                              <Typography
                                variant='subtitle1'
                                fontWeight='medium'
                              >
                                {option.label}
                              </Typography>
                              <Typography
                                variant='body2'
                                color='text.secondary'
                              >
                                {option.description}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </FormControl>

              <Box mt={3} p={2} bgcolor='action.hover' borderRadius={1}>
                <Typography variant='body2' color='text.secondary'>
                  <strong>Current Theme:</strong>{' '}
                  {themeOptions.find((t) => t.value === mode)?.label}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Theme changes are applied immediately and will be remembered
                  for your next visit.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Settings Placeholder */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Additional Settings
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                More customization options will be available in future updates.
              </Typography>
              <Box mt={2} display='flex' flexWrap='wrap' gap={1}>
                <Chip label='Notifications' variant='outlined' size='small' />
                <Chip label='Language' variant='outlined' size='small' />
                <Chip label='Time Zone' variant='outlined' size='small' />
                <Chip label='Accessibility' variant='outlined' size='small' />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
