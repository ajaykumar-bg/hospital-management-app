import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { permissionLabels, allRolePermissions } from './constants';

const RoleComparisonTable = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Role Comparison
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Compare permissions between different hospital roles
        </Typography>

        <TableContainer component={Paper} variant='outlined'>
          <Table size='small' sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Permission</TableCell>
                <TableCell align='center'>Admin</TableCell>
                <TableCell align='center'>Staff</TableCell>
                <TableCell align='center'>Doctor</TableCell>
                <TableCell align='center'>Nurse</TableCell>
                <TableCell align='center'>Patient</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(permissionLabels).map((key) => (
                <TableRow key={key} hover>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{ fontWeight: 500 }}
                  >
                    {permissionLabels[key]}
                  </TableCell>
                  {['admin', 'staff', 'doctor', 'nurse', 'patient'].map(
                    (role) => (
                      <TableCell align='center' key={role}>
                        <Chip
                          label={allRolePermissions[role][key] ? '✓' : '✗'}
                          color={
                            allRolePermissions[role][key] ? 'success' : 'error'
                          }
                          size='small'
                          variant='filled'
                          sx={{ minWidth: 32 }}
                        />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RoleComparisonTable;
