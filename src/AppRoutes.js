import React from 'react';
import { Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Configuration from './components/Configuration';

function AppRoutes() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/*'
            element={
              <>
                <Navbar />
                <Container maxWidth={false} sx={{ padding: 2 }}>
                  <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/configuration' element={<Configuration />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                  </Routes>
                </Container>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
