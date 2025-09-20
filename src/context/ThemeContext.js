import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { getTheme } from '../theme';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark'); // default to dark mode

  const setTheme = (newTheme) => {
    if (['light', 'dark', 'purple'].includes(newTheme)) {
      setMode(newTheme);
    }
  };

  const theme = getTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, setTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
