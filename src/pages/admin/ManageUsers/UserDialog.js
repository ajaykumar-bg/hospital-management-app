import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Box,
} from '@mui/material';

const UserDialog = ({
  open,
  editUser,
  formData,
  onClose,
  onSave,
  onFormChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{editUser ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent>
        <Box display='flex' flexDirection='column' gap={2} mt={1}>
          <TextField
            label='Full Name'
            value={formData.name}
            onChange={(e) =>
              onFormChange({ ...formData, name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label='Email'
            type='email'
            value={formData.email}
            onChange={(e) =>
              onFormChange({ ...formData, email: e.target.value })
            }
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) =>
                onFormChange({ ...formData, role: e.target.value })
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
              onFormChange({ ...formData, department: e.target.value })
            }
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) =>
                onFormChange({ ...formData, status: e.target.value })
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant='contained'>
          {editUser ? 'Update' : 'Add'} User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
