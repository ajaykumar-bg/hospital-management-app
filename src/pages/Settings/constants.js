import { LightMode, DarkMode, Palette } from '@mui/icons-material';

export const themeOptions = [
  {
    value: 'light',
    label: 'Light Mode',
    description: 'Clean, bright interface with high contrast',
    icon: <LightMode color='primary' />,
    preview: '#ffffff',
    textColor: '#000000',
  },
  {
    value: 'dark',
    label: 'Dark Mode',
    description: 'Dark background for reduced eye strain',
    icon: <DarkMode color='primary' />,
    preview: '#121212',
    textColor: '#ffffff',
  },
  {
    value: 'purple',
    label: 'Purple Theme',
    description: 'Elegant purple design for medical professionals',
    icon: <Palette color='primary' />,
    preview: '#ffffff',
    textColor: '#7f4a9b',
  },
];

export const additionalSettingsFeatures = [
  {
    label: 'Notifications',
    description: 'Email and in-app notification preferences',
  },
  { label: 'Language', description: 'Multi-language support' },
  { label: 'Time Zone', description: 'User timezone settings' },
  {
    label: 'Accessibility',
    description: 'Screen reader and keyboard navigation options',
  },
];

export const settingsPageInfo = {
  title: 'Settings',
  subtitle: 'Customize your Hospital Management System experience',
  themeLabel: 'Skin Mode',
  themeDescription:
    'Choose your preferred theme for the best visual experience',
  userInfoTitle: 'User Information',
  appearanceTitle: 'Appearance Settings',
  additionalTitle: 'Additional Settings',
  additionalDescription:
    'More customization options will be available in future updates.',
  themeStatusNote:
    'Theme changes are applied immediately and will be remembered for your next visit.',
};
