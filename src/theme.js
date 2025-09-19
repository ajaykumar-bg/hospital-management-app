import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
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
