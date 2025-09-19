import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const mockUsers = [
  {
    id: 1,
    name: 'Dr. John Smith',
    email: 'john.smith@hospital.com',
    role: 'doctor',
    department: 'Cardiology',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Nurse Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    role: 'nurse',
    department: 'Emergency',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@hospital.com',
    role: 'staff',
    department: 'Administration',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Dr. Emily Davis',
    email: 'emily.davis@hospital.com',
    role: 'doctor',
    department: 'Pediatrics',
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Patient Jane Doe',
    email: 'jane.doe@email.com',
    role: 'patient',
    department: 'N/A',
    status: 'Active',
  },
];

export default function ManageUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active',
  });

  const handleAddUser = () => {
    setEditUser(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      status: 'Active',
    });
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setFormData(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSaveUser = () => {
    if (editUser) {
      setUsers(
        users.map((user) =>
          user.id === editUser.id ? { ...formData, id: editUser.id } : user
        )
      );
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setOpenDialog(false);
  };

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
    <Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <Typography variant='h4'>Manage Users</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add New User
        </Button>
      </Box>

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
                  <IconButton onClick={() => handleEditUser(user)} size='small'>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteUser(user.id)}
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

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>{editUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Box display='flex' flexDirection='column' gap={2} mt={1}>
            <TextField
              label='Full Name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label='Email'
              type='email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                label='Role'
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='doctor'>Doctor</MenuItem>
                <MenuItem value='nurse'>Nurse</MenuItem>
                <MenuItem value='staff'>Staff</MenuItem>
                <MenuItem value='patient'>Patient</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Department'
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                label='Status'
              >
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveUser} variant='contained'>
            {editUser ? 'Update' : 'Add'} User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
