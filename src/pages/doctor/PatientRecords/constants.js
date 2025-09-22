import {
  Visibility as ViewIcon,
  MedicalServices as MedicalIcon,
  History as HistoryIcon,
  Assignment as PrescriptionIcon,
} from '@mui/icons-material';

export const mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    lastVisit: '2024-09-15',
    status: 'Stable',
    room: '201A',
    medicalHistory: ['Diabetes Type 2', 'High Blood Pressure'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    vitals: { bp: '130/85', pulse: '72', temp: '98.6°F', weight: '180 lbs' },
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    condition: 'Pneumonia',
    lastVisit: '2024-09-18',
    status: 'Improving',
    room: '105B',
    medicalHistory: ['Asthma'],
    currentMedications: ['Amoxicillin 875mg', 'Albuterol Inhaler'],
    vitals: { bp: '118/76', pulse: '68', temp: '99.2°F', weight: '125 lbs' },
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 67,
    gender: 'Male',
    condition: 'Post-Surgery Recovery',
    lastVisit: '2024-09-17',
    status: 'Critical',
    room: 'ICU-3',
    medicalHistory: ['Heart Disease', 'Stroke'],
    currentMedications: ['Warfarin 5mg', 'Atorvastatin 40mg'],
    vitals: { bp: '145/92', pulse: '85', temp: '98.9°F', weight: '165 lbs' },
  },
];

export const patientStatusConfig = {
  Stable: { color: 'success', priority: 'low' },
  Improving: { color: 'info', priority: 'medium' },
  Critical: { color: 'error', priority: 'high' },
  Moderate: { color: 'warning', priority: 'medium' },
};

export const patientRecordsConfig = {
  title: 'Patient Records',
  tableHeaders: [
    'Patient',
    'Age/Gender',
    'Condition',
    'Room',
    'Status',
    'Last Visit',
    'Actions',
  ],
  dialogTabs: [
    { label: 'Overview', icon: <MedicalIcon /> },
    { label: 'Medical History', icon: <HistoryIcon /> },
    { label: 'Current Medications', icon: <PrescriptionIcon /> },
  ],
  actions: {
    view: {
      label: 'View',
      icon: <ViewIcon />,
    },
  },
};

export const getStatusColor = (status) => {
  return patientStatusConfig[status]?.color || 'default';
};

export const getPatientPriority = (status) => {
  return patientStatusConfig[status]?.priority || 'low';
};
