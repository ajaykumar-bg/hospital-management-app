import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const PatientMedicalHistory = ({ patient }) => {
  if (!patient) return null;

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Medical History
      </Typography>
      <List>
        {patient.medicalHistory.map((condition, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText primary={condition} />
            </ListItem>
            {index < patient.medicalHistory.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </>
  );
};

export default PatientMedicalHistory;
