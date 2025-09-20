import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Paper,
} from '@mui/material';
import { useThemeMode } from '../../context/ThemeContext';
import { themeOptions, settingsPageInfo } from './constants';

const ThemeSelector = () => {
  const { mode, setTheme } = useThemeMode();

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {settingsPageInfo.appearanceTitle}
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={3}>
          {settingsPageInfo.themeDescription}
        </Typography>

        <FormControl component='fieldset' fullWidth>
          <FormLabel component='legend' sx={{ mb: 2, fontWeight: 'medium' }}>
            {settingsPageInfo.themeLabel}
          </FormLabel>
          <RadioGroup value={mode} onChange={handleThemeChange} sx={{ gap: 2 }}>
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
                        <Typography variant='subtitle1' fontWeight='medium'>
                          {option.label}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
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
          <Typography variant='body2' color='text.info'>
            {themeOptions.find((t) => t.value === mode)?.description}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {settingsPageInfo.themeStatusNote}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
