import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Assignment as TaskIcon,
  CheckCircle as CompleteIcon,
  Schedule as PendingIcon,
} from '@mui/icons-material';

const mockTasks = [
  {
    id: 1,
    patientName: 'John Smith',
    room: '201A',
    task: 'Administer morning medication',
    priority: 'High',
    status: 'Pending',
    assignedTime: '08:00',
    dueTime: '09:00',
    notes: 'Blood pressure medication - Lisinopril 10mg',
  },
  {
    id: 2,
    patientName: 'Sarah Johnson',
    room: '105B',
    task: 'Vital signs check',
    priority: 'Medium',
    status: 'Completed',
    assignedTime: '07:30',
    dueTime: '08:30',
    notes: 'Temperature, BP, pulse, oxygen saturation',
  },
  {
    id: 3,
    patientName: 'Michael Brown',
    room: 'ICU-3',
    task: 'Wound dressing change',
    priority: 'High',
    status: 'In Progress',
    assignedTime: '10:00',
    dueTime: '11:00',
    notes: 'Post-surgical wound care, sterile technique required',
  },
  {
    id: 4,
    patientName: 'Emily Davis',
    room: '302C',
    task: 'Patient education - diabetes management',
    priority: 'Low',
    status: 'Pending',
    assignedTime: '14:00',
    dueTime: '15:00',
    notes: 'Review insulin administration and diet guidelines',
  },
];

export default function PatientCareTasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: 'error',
      Medium: 'warning',
      Low: 'info',
    };
    return colors[priority] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'warning',
      'In Progress': 'info',
      Completed: 'success',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      Pending: <PendingIcon />,
      'In Progress': <TaskIcon />,
      Completed: <CompleteIcon />,
    };
    return icons[status] || <TaskIcon />;
  };

  const filteredTasks =
    filterStatus === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const completionRate = Math.round(
    (tasks.filter((task) => task.status === 'Completed').length /
      tasks.length) *
      100
  );

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Patient Care Tasks
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='primary'>
                Total Tasks
              </Typography>
              <Typography variant='h4'>{tasks.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='warning.main'>
                Pending
              </Typography>
              <Typography variant='h4'>
                {tasks.filter((task) => task.status === 'Pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='success.main'>
                Completed
              </Typography>
              <Typography variant='h4'>
                {tasks.filter((task) => task.status === 'Completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='info.main'>
                Completion Rate
              </Typography>
              <Typography variant='h4'>{completionRate}%</Typography>
              <LinearProgress
                variant='determinate'
                value={completionRate}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Controls */}
      <Box mb={3}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label='Filter by Status'
          >
            <MenuItem value='All'>All Tasks</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='In Progress'>In Progress</MenuItem>
            <MenuItem value='Completed'>Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tasks Table */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Patient Care Tasks ({filterStatus})
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Box display='flex' alignItems='center' gap={2}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {task.patientName.charAt(0)}
                        </Avatar>
                        <Typography variant='body2'>
                          {task.patientName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{task.room}</TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>
                      <Chip
                        label={task.priority}
                        color={getPriorityColor(task.priority)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(task.status)}
                        label={task.status}
                        color={getStatusColor(task.status)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>{task.dueTime}</TableCell>
                    <TableCell>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => handleViewTask(task)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      {task.status !== 'Completed' && (
                        <Button
                          variant='contained'
                          size='small'
                          color='success'
                          onClick={() => handleCompleteTask(task.id)}
                        >
                          Complete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Task Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label='Patient Name'
                    value={selectedTask.patientName}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Room'
                    value={selectedTask.room}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Priority'
                    value={selectedTask.priority}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Task'
                    value={selectedTask.task}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Assigned Time'
                    value={selectedTask.assignedTime}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Due Time'
                    value={selectedTask.dueTime}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Notes'
                    value={selectedTask.notes}
                    fullWidth
                    multiline
                    rows={3}
                    disabled
                    variant='filled'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Status'
                    value={selectedTask.status}
                    fullWidth
                    disabled
                    variant='filled'
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {selectedTask && selectedTask.status !== 'Completed' && (
            <Button
              variant='contained'
              color='success'
              onClick={() => {
                handleCompleteTask(selectedTask.id);
                setOpenDialog(false);
              }}
            >
              Mark Complete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
