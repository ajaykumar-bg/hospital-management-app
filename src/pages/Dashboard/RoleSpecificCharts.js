import React from 'react';
import { LineChart, BarChart, DonutChart } from './ChartComponents';

// Doctor Charts
export const DoctorPatientTrends = () => {
  const patientTrendsData = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 15 },
    { label: 'Wed', value: 8 },
    { label: 'Thu', value: 18 },
    { label: 'Fri', value: 14 },
    { label: 'Sat', value: 6 },
    { label: 'Sun', value: 4 },
  ];

  return (
    <LineChart
      title='Daily Patient Appointments'
      data={patientTrendsData}
      color='#2196f3'
    />
  );
};

export const DoctorAppointmentTypes = () => {
  const appointmentTypesData = [
    { label: 'Regular Checkup', value: 45 },
    { label: 'Follow-up', value: 30 },
    { label: 'Emergency', value: 15 },
    { label: 'Consultation', value: 25 },
  ];

  return (
    <DonutChart
      title='Appointment Types'
      data={appointmentTypesData}
      centerLabel='115'
    />
  );
};

export const DoctorTreatmentSuccess = () => {
  const treatmentSuccessData = [
    { label: 'Cardiology', value: 92 },
    { label: 'General Medicine', value: 88 },
    { label: 'Pediatrics', value: 95 },
    { label: 'Surgery', value: 87 },
  ];

  return (
    <BarChart
      title='Treatment Success Rate (%)'
      data={treatmentSuccessData}
      color='#4caf50'
    />
  );
};

// Nurse Charts
export const NurseVitalSigns = () => {
  const vitalSignsTrendsData = [
    { label: '6AM', value: 8 },
    { label: '9AM', value: 12 },
    { label: '12PM', value: 15 },
    { label: '3PM', value: 10 },
    { label: '6PM', value: 7 },
    { label: '9PM', value: 5 },
    { label: '12AM', value: 3 },
  ];

  return (
    <LineChart
      title='Daily Vital Signs Monitoring'
      data={vitalSignsTrendsData}
      color='#9c27b0'
    />
  );
};

export const NurseMedicationSchedule = () => {
  const medicationScheduleData = [
    { label: 'Morning Meds', value: 25 },
    { label: 'Afternoon Meds', value: 18 },
    { label: 'Evening Meds', value: 22 },
    { label: 'Night Meds', value: 12 },
  ];

  return (
    <BarChart
      title='Medication Schedule'
      data={medicationScheduleData}
      color='#ff9800'
    />
  );
};

export const NursePatientCare = () => {
  const patientCareTasksData = [
    { label: 'Vital Signs Check', value: 35 },
    { label: 'Medication Admin', value: 28 },
    { label: 'Patient Assessment', value: 20 },
    { label: 'Documentation', value: 15 },
  ];

  return (
    <DonutChart
      title='Patient Care Tasks'
      data={patientCareTasksData}
      centerLabel='98'
    />
  );
};

// Admin Charts
export const AdminHospitalAnalytics = () => {
  const hospitalAnalyticsData = [
    { label: 'Jan', value: 850 },
    { label: 'Feb', value: 920 },
    { label: 'Mar', value: 1050 },
    { label: 'Apr', value: 980 },
    { label: 'May', value: 1200 },
    { label: 'Jun', value: 1150 },
    { label: 'Jul', value: 1300 },
  ];

  return (
    <LineChart
      title='Monthly Patient Volume'
      data={hospitalAnalyticsData}
      color='#f44336'
    />
  );
};

export const AdminDepartmentStats = () => {
  const departmentStatsData = [
    { label: 'Emergency', value: 320 },
    { label: 'Cardiology', value: 280 },
    { label: 'Pediatrics', value: 240 },
    { label: 'Surgery', value: 200 },
    { label: 'General Medicine', value: 350 },
  ];

  return (
    <BarChart
      title='Department Activity'
      data={departmentStatsData}
      color='#2196f3'
    />
  );
};

export const AdminUserDistribution = () => {
  const userRoleDistributionData = [
    { label: 'Doctors', value: 45 },
    { label: 'Nurses', value: 78 },
    { label: 'Staff', value: 32 },
    { label: 'Patients', value: 1247 },
  ];

  return (
    <DonutChart
      title='User Distribution'
      data={userRoleDistributionData}
      centerLabel='1.4K'
    />
  );
};

// Staff Charts
export const StaffAppointmentFlow = () => {
  const appointmentFlowData = [
    { label: '8AM', value: 5 },
    { label: '10AM', value: 12 },
    { label: '12PM', value: 18 },
    { label: '2PM', value: 15 },
    { label: '4PM', value: 10 },
    { label: '6PM', value: 6 },
  ];

  return (
    <LineChart
      title='Daily Appointment Flow'
      data={appointmentFlowData}
      color='#00bcd4'
    />
  );
};

export const StaffRegistrationTrends = () => {
  const registrationTrendsData = [
    { label: 'New Patients', value: 45 },
    { label: 'Returning Patients', value: 78 },
    { label: 'Emergency Admissions', value: 23 },
    { label: 'Scheduled Admissions', value: 34 },
  ];

  return (
    <BarChart
      title='Patient Registration Trends'
      data={registrationTrendsData}
      color='#4caf50'
    />
  );
};

export const StaffWorkloadDistribution = () => {
  const workloadDistributionData = [
    { label: 'Patient Registration', value: 35 },
    { label: 'Appointment Scheduling', value: 28 },
    { label: 'Insurance Processing', value: 22 },
    { label: 'Administrative Tasks', value: 15 },
  ];

  return (
    <DonutChart
      title='Workload Distribution'
      data={workloadDistributionData}
      centerLabel='100%'
    />
  );
};

// Patient Charts
export const PatientHealthTrends = () => {
  const healthTrendsData = [
    { label: 'Week 1', value: 78 },
    { label: 'Week 2', value: 82 },
    { label: 'Week 3', value: 85 },
    { label: 'Week 4', value: 80 },
    { label: 'Week 5', value: 87 },
    { label: 'Week 6', value: 90 },
  ];

  return (
    <LineChart
      title='Health Score Trends'
      data={healthTrendsData}
      color='#4caf50'
    />
  );
};

export const PatientAppointmentHistory = () => {
  const appointmentHistoryData = [
    { label: 'Completed', value: 12 },
    { label: 'Upcoming', value: 3 },
    { label: 'Cancelled', value: 2 },
    { label: 'Rescheduled', value: 1 },
  ];

  return (
    <DonutChart
      title='Appointment History'
      data={appointmentHistoryData}
      centerLabel='18'
    />
  );
};

export const PatientHealthMetrics = () => {
  const healthMetricsData = [
    { label: 'Blood Pressure', value: 85 },
    { label: 'Heart Rate', value: 92 },
    { label: 'Weight Management', value: 78 },
    { label: 'Activity Level', value: 88 },
  ];

  return (
    <BarChart
      title='Health Metrics (%)'
      data={healthMetricsData}
      color='#2196f3'
    />
  );
};
