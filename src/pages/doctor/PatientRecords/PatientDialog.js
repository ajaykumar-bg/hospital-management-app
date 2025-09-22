import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { patientRecordsConfig } from './constants';
import PatientOverview from './PatientOverview';
import PatientMedicalHistory from './PatientMedicalHistory';
import PatientMedications from './PatientMedications';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const PatientDialog = ({ open, onClose, patient, tabValue, onTabChange }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Patient Details: {patient?.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => onTabChange(newValue)}
          >
            {patientRecordsConfig.dialogTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} icon={tab.icon} />
            ))}
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <PatientOverview patient={patient} />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <PatientMedicalHistory patient={patient} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <PatientMedications patient={patient} />
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant='contained'>Update Record</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientDialog;
