import React, { useState, useMemo } from 'react';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableSortLabel,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const UserTable = ({ users, onEditUser, onDeleteUser }) => {
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  // Get unique values for filter dropdowns
  const uniqueRoles = useMemo(() => {
    return [...new Set(users.map((user) => user.role))].sort();
  }, [users]);

  const uniqueDepartments = useMemo(() => {
    return [
      ...new Set(
        users.map((user) => user.department).filter((dept) => dept !== 'N/A')
      ),
    ].sort();
  }, [users]);

  const uniqueStatuses = useMemo(() => {
    return [...new Set(users.map((user) => user.status))].sort();
  }, [users]);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesDepartment =
        !departmentFilter || user.department === departmentFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [
    users,
    searchText,
    roleFilter,
    departmentFilter,
    statusFilter,
    orderBy,
    order,
  ]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const clearFilters = () => {
    setSearchText('');
    setRoleFilter('');
    setDepartmentFilter('');
    setStatusFilter('');
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
    <Paper sx={{ width: '100%', mb: 2 }}>
      {/* Search and Filter Controls */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search by name...'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size='small'>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label='Role'
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value=''>All Roles</MenuItem>
                {uniqueRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size='small'>
              <InputLabel>Department</InputLabel>
              <Select
                value={departmentFilter}
                label='Department'
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <MenuItem value=''>All Departments</MenuItem>
                {uniqueDepartments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size='small'>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label='Status'
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value=''>All Statuses</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant='body2' color='text.secondary'>
                {filteredAndSortedUsers.length} of {users.length} users
              </Typography>
              {(searchText ||
                roleFilter ||
                departmentFilter ||
                statusFilter) && (
                <IconButton
                  size='small'
                  onClick={clearFilters}
                  title='Clear filters'
                >
                  <Typography
                    variant='caption'
                    sx={{ textDecoration: 'underline' }}
                  >
                    Clear
                  </Typography>
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Table with fixed height and scroll */}
      <TableContainer sx={{ maxHeight: 500, overflow: 'auto' }}>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderBy === 'role' ? order : 'asc'}
                  onClick={() => handleRequestSort('role')}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'department'}
                  direction={orderBy === 'department' ? order : 'asc'}
                  onClick={() => handleRequestSort('department')}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Box display='flex' alignItems='center' gap={2}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user.name.charAt(0)}
                    </Avatar>
                    <Typography variant='body2'>{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role.toUpperCase()}
                    color={getRoleColor(user.role)}
                    size='small'
                  />
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>{user.department}</Typography>
                </TableCell>
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
            {filteredAndSortedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ py: 4 }}
                  >
                    No users found matching the current filters
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;
