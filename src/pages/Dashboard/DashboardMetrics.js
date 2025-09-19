import {
  People as PeopleIcon,
  LocalHospital as DoctorIcon,
  EventNote as AppointmentIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';

export const DashboardMetrics = ({ role }) => {
  const metrics = {
    admin: [
      {
        title: 'Total Patients',
        value: '1,247',
        icon: <PeopleIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Active Doctors',
        value: '34',
        icon: <DoctorIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Today Appointments',
        value: '89',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'warning',
      },
      {
        title: 'Monthly Revenue',
        value: '$127K',
        icon: <TrendingIcon fontSize='large' />,
        color: 'info',
      },
    ],
    staff: [
      {
        title: 'Pending Tasks',
        value: '12',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'warning',
      },
      {
        title: 'Completed Today',
        value: '28',
        icon: <TrendingIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Total Patients',
        value: '1,247',
        icon: <PeopleIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Appointments',
        value: '89',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'info',
      },
    ],
    doctor: [
      {
        title: 'My Patients',
        value: '156',
        icon: <PeopleIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Today Appointments',
        value: '12',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'warning',
      },
      {
        title: 'Completed Visits',
        value: '8',
        icon: <TrendingIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Pending Reviews',
        value: '4',
        icon: <DoctorIcon fontSize='large' />,
        color: 'info',
      },
    ],
    nurse: [
      {
        title: 'Assigned Patients',
        value: '23',
        icon: <PeopleIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Tasks Today',
        value: '15',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'warning',
      },
      {
        title: 'Completed Tasks',
        value: '11',
        icon: <TrendingIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Medications Due',
        value: '7',
        icon: <DoctorIcon fontSize='large' />,
        color: 'error',
      },
    ],
    patient: [
      {
        title: 'Upcoming Appointments',
        value: '2',
        icon: <AppointmentIcon fontSize='large' />,
        color: 'primary',
      },
      {
        title: 'Prescriptions',
        value: '3',
        icon: <DoctorIcon fontSize='large' />,
        color: 'info',
      },
      {
        title: 'Test Results',
        value: '1',
        icon: <TrendingIcon fontSize='large' />,
        color: 'success',
      },
      {
        title: 'Bills Pending',
        value: '1',
        icon: <PeopleIcon fontSize='large' />,
        color: 'warning',
      },
    ],
  };

  return metrics[role] || metrics.patient;
};
