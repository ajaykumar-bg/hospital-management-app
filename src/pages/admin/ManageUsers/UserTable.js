import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const UserTable = ({ users, onEditUser, onDeleteUser }) => {
  const getRoleColor = (role) => {
    const colors = {
      admin: 'error',
      doctor: 'success',
      nurse: 'primary',
      staff: 'info',
      patient: 'secondary',
    };
    return colors[role] || 'default';
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'error';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Box display='flex' alignItems='center' gap={2}>
                  <Avatar>{user.name.charAt(0)}</Avatar>
                  <Typography variant='body2'>{user.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={user.role.toUpperCase()}
                  color={getRoleColor(user.role)}
                  size='small'
                />
              </TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>
                <Chip
                  label={user.status}
                  color={getStatusColor(user.status)}
                  size='small'
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEditUser(user)} size='small'>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDeleteUser(user.id)}
                  size='small'
                  color='error'
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
