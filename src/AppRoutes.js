import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Configuration from './components/Configuration';
import ErrorBoundary from './ErrorBoundary';

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className='app'>
        <ErrorBoundary>
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
                      <Route path='/profile' element={<Profile />} />
                      <Route path='/patients' element={<Patients />} />
                      <Route path='/doctors' element={<Doctors />} />
                      <Route path='/appointments' element={<Appointments />} />
                      <Route
                        path='/configuration'
                        element={<Configuration />}
                      />
                      <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                  </Container>
                </>
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
