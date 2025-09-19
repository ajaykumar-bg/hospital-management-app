import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Configuration from './components/Configuration';
import Settings from './pages/Settings';
import ErrorBoundary from './ErrorBoundary';

// Admin Pages
import ManageUsers from './pages/admin/ManageUsers';
import SystemReports from './pages/admin/SystemReports';
import HospitalSettings from './pages/admin/HospitalSettings';

// Doctor Pages
import PatientRecords from './pages/doctor/PatientRecords';
import ScheduleAppointments from './pages/doctor/ScheduleAppointments';
import WritePrescriptions from './pages/doctor/WritePrescriptions';

// Nurse Pages
import PatientCareTasks from './pages/nurse/PatientCareTasks';
import MedicationSchedule from './pages/nurse/MedicationSchedule';
import VitalSigns from './pages/nurse/VitalSigns';

// Staff Pages
import AppointmentManagement from './pages/staff/AppointmentManagement';
import PatientRegistration from './pages/staff/PatientRegistration';
import InsuranceProcessing from './pages/staff/InsuranceProcessing';

// Patient Pages
import BookAppointment from './pages/patient/BookAppointment';
import ViewTestResults from './pages/patient/ViewTestResults';
import PayBills from './pages/patient/PayBills';

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
                      <Route path='/settings' element={<Settings />} />
                      <Route
                        path='/configuration'
                        element={<Configuration />}
                      />

                      {/* Admin Routes */}
                      <Route
                        path='/admin/manage-users'
                        element={<ManageUsers />}
                      />
                      <Route
                        path='/admin/system-reports'
                        element={<SystemReports />}
                      />
                      <Route
                        path='/admin/hospital-settings'
                        element={<HospitalSettings />}
                      />

                      {/* Doctor Routes */}
                      <Route
                        path='/doctor/patient-records'
                        element={<PatientRecords />}
                      />
                      <Route
                        path='/doctor/schedule-appointments'
                        element={<ScheduleAppointments />}
                      />
                      <Route
                        path='/doctor/write-prescriptions'
                        element={<WritePrescriptions />}
                      />

                      {/* Nurse Routes */}
                      <Route
                        path='/nurse/patient-care-tasks'
                        element={<PatientCareTasks />}
                      />
                      <Route
                        path='/nurse/medication-schedule'
                        element={<MedicationSchedule />}
                      />
                      <Route
                        path='/nurse/vital-signs'
                        element={<VitalSigns />}
                      />

                      {/* Staff Routes */}
                      <Route
                        path='/staff/appointment-management'
                        element={<AppointmentManagement />}
                      />
                      <Route
                        path='/staff/patient-registration'
                        element={<PatientRegistration />}
                      />
                      <Route
                        path='/staff/insurance-processing'
                        element={<InsuranceProcessing />}
                      />

                      {/* Patient Routes */}
                      <Route
                        path='/patient/book-appointment'
                        element={<BookAppointment />}
                      />
                      <Route
                        path='/patient/view-test-results'
                        element={<ViewTestResults />}
                      />
                      <Route path='/patient/pay-bills' element={<PayBills />} />

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
