// Mock doctors data
export const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.8,
    experience: 12,
    consultationFee: 150,
    nextAvailable: new Date(Date.now() + 86400000), // Tomorrow
    avatar: 'https://via.placeholder.com/40',
    qualifications: [
      'MD Cardiology',
      'MBBS',
      'Fellowship in Interventional Cardiology',
    ],
    languages: ['English', 'Spanish'],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    rating: 4.9,
    experience: 15,
    consultationFee: 200,
    nextAvailable: new Date(Date.now() + 172800000), // Day after tomorrow
    avatar: 'https://via.placeholder.com/40',
    qualifications: ['MD Neurology', 'MBBS', 'DM Neurology'],
    languages: ['English', 'Mandarin'],
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    rating: 4.7,
    experience: 8,
    consultationFee: 120,
    nextAvailable: new Date(Date.now() + 259200000), // 3 days from now
    avatar: 'https://via.placeholder.com/40',
    qualifications: [
      'MD Pediatrics',
      'MBBS',
      'Fellowship in Pediatric Emergency',
    ],
    languages: ['English', 'Spanish', 'Portuguese'],
  },
  {
    id: 4,
    name: 'Dr. David Wilson',
    specialty: 'Orthopedics',
    rating: 4.6,
    experience: 20,
    consultationFee: 180,
    nextAvailable: new Date(Date.now() + 345600000), // 4 days from now
    avatar: 'https://via.placeholder.com/40',
    qualifications: ['MS Orthopedics', 'MBBS', 'Fellowship in Sports Medicine'],
    languages: ['English'],
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Dermatology',
    rating: 4.8,
    experience: 10,
    consultationFee: 140,
    nextAvailable: new Date(Date.now() + 432000000), // 5 days from now
    avatar: 'https://via.placeholder.com/40',
    qualifications: [
      'MD Dermatology',
      'MBBS',
      'Fellowship in Cosmetic Dermatology',
    ],
    languages: ['English', 'French'],
  },
];

// Time slots configuration
export const timeSlots = [
  { id: 1, time: '09:00 AM', value: '09:00' },
  { id: 2, time: '09:30 AM', value: '09:30' },
  { id: 3, time: '10:00 AM', value: '10:00' },
  { id: 4, time: '10:30 AM', value: '10:30' },
  { id: 5, time: '11:00 AM', value: '11:00' },
  { id: 6, time: '11:30 AM', value: '11:30' },
  { id: 7, time: '02:00 PM', value: '14:00' },
  { id: 8, time: '02:30 PM', value: '14:30' },
  { id: 9, time: '03:00 PM', value: '15:00' },
  { id: 10, time: '03:30 PM', value: '15:30' },
  { id: 11, time: '04:00 PM', value: '16:00' },
  { id: 12, time: '04:30 PM', value: '16:30' },
];

// Appointment types
export const appointmentTypes = [
  { value: 'consultation', label: 'General Consultation', duration: 30 },
  { value: 'follow-up', label: 'Follow-up Visit', duration: 20 },
  { value: 'procedure', label: 'Procedure', duration: 60 },
  { value: 'emergency', label: 'Emergency', duration: 45 },
];

// Specialties for filtering
export const specialties = [
  'All Specialties',
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'General Medicine',
  'Psychiatry',
  'Gynecology',
  'ENT',
];

// Form validation rules
export const formValidation = {
  reason: {
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  symptoms: {
    required: false,
    maxLength: 1000,
  },
  preferredDate: {
    required: true,
    minDate: new Date(),
  },
  timeSlot: {
    required: true,
  },
};

// UI configuration
export const uiConfig = {
  maxDoctorsPerPage: 6,
  defaultSortBy: 'rating',
  defaultSortOrder: 'desc',
  showDoctorDetails: true,
  enableQuickBooking: true,
  enableFavorites: true,
};

// Status configurations
export const appointmentStatus = {
  PENDING: { label: 'Pending', color: 'warning', icon: 'schedule' },
  CONFIRMED: { label: 'Confirmed', color: 'success', icon: 'check_circle' },
  CANCELLED: { label: 'Cancelled', color: 'error', icon: 'cancel' },
  COMPLETED: { label: 'Completed', color: 'info', icon: 'done_all' },
};

// Payment methods
export const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: 'credit_card' },
  { id: 'insurance', label: 'Insurance', icon: 'security' },
  { id: 'cash', label: 'Cash Payment', icon: 'money' },
  { id: 'wallet', label: 'Digital Wallet', icon: 'account_balance_wallet' },
];
