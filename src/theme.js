import { createTheme } from '@mui/material/styles';

// Custom purple theme configuration
const customPurpleTheme = {
  primary: {
    main: '#7f4a9b',
    light: '#a970b8',
    dark: '#5a3469',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#9b7f4a',
    light: '#b89a70',
    dark: '#6b5833',
    contrastText: '#ffffff',
  },
  background: {
    default: '#faf8fc',
    paper: '#ffffff',
  },
  text: {
    primary: '#2d1b36',
    secondary: '#5a4a6b',
  },
  divider: '#e1d4e8',
  action: {
    hover: '#f4f0f7',
    selected: '#ede4f1',
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
  },
};

export const getTheme = (mode) => {
  // Handle custom purple theme
  if (mode === 'purple') {
    return createTheme({
      palette: {
        mode: 'light', // Base it on light mode for better contrast
        ...customPurpleTheme,
      },
      typography: {
        fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
        h2: {
          fontWeight: 700,
          fontSize: '1.5rem',
        },
        h4: {
          fontWeight: 500,
          fontSize: '1.1rem',
        },
        h5: {
          fontWeight: 500,
          fontSize: '1rem',
        },
        h6: {
          fontWeight: 500,
          fontSize: '0.95rem',
        },
        subtitle1: {
          fontSize: '0.95rem',
        },
        subtitle2: {
          fontSize: '0.85rem',
        },
        body1: {
          fontSize: '0.95rem',
        },
        body2: {
          fontSize: '0.85rem',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            '*': {
              // WebKit browsers (Chrome, Safari, Edge)
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f4f0f7',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c4a3d1',
                borderRadius: '4px',
                border: '1px solid #f4f0f7',
                '&:hover': {
                  backgroundColor: '#b088c7',
                },
                '&:active': {
                  backgroundColor: '#9b7f4a',
                },
              },
              '&::-webkit-scrollbar-corner': {
                backgroundColor: '#f4f0f7',
              },
              // Firefox
              scrollbarWidth: 'thin',
              scrollbarColor: '#c4a3d1 #f4f0f7',
            },
            // Global body scrollbar
            body: {
              '&::-webkit-scrollbar': {
                width: '12px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#faf8fc',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#d1b3e0',
                borderRadius: '6px',
                border: '2px solid #faf8fc',
                '&:hover': {
                  backgroundColor: '#c4a3d1',
                },
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: '0.75rem',
              boxShadow: '0 2px 8px rgba(127, 74, 155, 0.1)',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 500,
            },
            contained: {
              boxShadow: '0 2px 8px rgba(127, 74, 155, 0.3)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(127, 74, 155, 0.4)',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              boxShadow: '0 2px 12px rgba(127, 74, 155, 0.08)',
              border: '1px solid #e1d4e8',
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 16,
            },
          },
        },
        MuiGrid: {
          styleOverrides: {
            root: {
              '& > .MuiGrid-item': {
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
              },
            },
          },
        },
      },
    });
  }

  // Default light/dark theme
  return createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
      h2: {
        fontWeight: 700,
        fontSize: '1.5rem',
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.1rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '0.95rem',
      },
      subtitle1: {
        fontSize: '0.95rem',
      },
      subtitle2: {
        fontSize: '0.85rem',
      },
      body1: {
        fontSize: '0.95rem',
      },
      body2: {
        fontSize: '0.85rem',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            // WebKit browsers (Chrome, Safari, Edge)
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: mode === 'dark' ? '#2d3748' : '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: mode === 'dark' ? '#4a5568' : '#c1c1c1',
              borderRadius: '4px',
              border:
                mode === 'dark' ? '1px solid #2d3748' : '1px solid #f1f1f1',
              '&:hover': {
                backgroundColor: mode === 'dark' ? '#718096' : '#a8a8a8',
              },
              '&:active': {
                backgroundColor: mode === 'dark' ? '#9ca3af' : '#888888',
              },
            },
            '&::-webkit-scrollbar-corner': {
              backgroundColor: mode === 'dark' ? '#2d3748' : '#f1f1f1',
            },
            // Firefox
            scrollbarWidth: 'thin',
            scrollbarColor:
              mode === 'dark' ? '#4a5568 #2d3748' : '#c1c1c1 #f1f1f1',
          },
          // Global body scrollbar
          body: {
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: mode === 'dark' ? '#1a202c' : '#f7fafc',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: mode === 'dark' ? '#4a5568' : '#cbd5e0',
              borderRadius: '6px',
              border:
                mode === 'dark' ? '2px solid #1a202c' : '2px solid #f7fafc',
              '&:hover': {
                backgroundColor: mode === 'dark' ? '#718096' : '#a0aec0',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            padding: '0.75rem',
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            '& > .MuiGrid-item': {
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            },
          },
        },
      },
    },
  });
};
