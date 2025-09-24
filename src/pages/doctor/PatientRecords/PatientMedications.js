import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const PatientMedications = ({ patient }) => {
  if (!patient) return null;

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Current Medications
      </Typography>
      <List dense>
        {patient.currentMedications.map((medication, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={medication}
                secondary='Take as prescribed'
              />
            </ListItem>
            {index < patient.currentMedications.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </>
  );
};

export default PatientMedications;
