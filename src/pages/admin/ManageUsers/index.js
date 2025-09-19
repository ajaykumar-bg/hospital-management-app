import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import UserTable from './UserTable';
import UserDialog from './UserDialog';
import { mockUsers, initialFormData } from './constants';

export default function ManageUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const handleAddUser = () => {
    setEditUser(null);
    setFormData(initialFormData);
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

      <UserTable
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      <UserDialog
        open={openDialog}
        editUser={editUser}
        formData={formData}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
        onFormChange={setFormData}
      />
    </Box>
  );
}
