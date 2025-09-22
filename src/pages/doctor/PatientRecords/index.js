import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { mockPatients, patientRecordsConfig } from './constants';
import PatientTable from './PatientTable';
import PatientDialog from './PatientDialog';

const PatientRecords = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
    setTabValue(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {patientRecordsConfig.title}
      </Typography>

      <PatientTable patients={mockPatients} onViewPatient={handleViewPatient} />

      <PatientDialog
        open={openDialog}
        onClose={handleCloseDialog}
        patient={selectedPatient}
        tabValue={tabValue}
        onTabChange={handleTabChange}
      />
    </Box>
  );
};

export default PatientRecords;
