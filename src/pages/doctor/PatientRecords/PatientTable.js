import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { patientRecordsConfig, getStatusColor } from './constants';

const PatientTable = ({ patients, onViewPatient }) => {
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {patientRecordsConfig.tableHeaders.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Box display='flex' alignItems='center' gap={2}>
                  <Avatar>{patient.name.charAt(0)}</Avatar>
                  <Typography variant='body2'>{patient.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                {patient.age} / {patient.gender}
              </TableCell>
              <TableCell>{patient.condition}</TableCell>
              <TableCell>{patient.room}</TableCell>
              <TableCell>
                <Chip
                  label={patient.status}
                  color={getStatusColor(patient.status)}
                  size='small'
                />
              </TableCell>
              <TableCell>{patient.lastVisit}</TableCell>
              <TableCell>
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={patientRecordsConfig.actions.view.icon}
                  onClick={() => onViewPatient(patient)}
                >
                  {patientRecordsConfig.actions.view.label}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
