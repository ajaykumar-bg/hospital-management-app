import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import AppRoutes from './AppRoutes';

function App() {
  const user = { name: 'Dr. John Doe' };
  return (
    <ThemeProvider>
      <Box sx={{ display: 'flex' }}>
        <TopBar user={user} />
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <AppRoutes />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
