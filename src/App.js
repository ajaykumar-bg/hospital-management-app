import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

import './App.css';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CssBaseline />
        <AppRoutes />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
