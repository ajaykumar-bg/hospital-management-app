import { createTheme } from '@mui/material/styles';

// Base typography configuration
const baseTypography = {
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
};

// Base component overrides
const getBaseComponents = (mode) => ({
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
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        // WebKit browsers (Chrome, Safari, Edge)
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: getScrollbarColors(mode).track,
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: getScrollbarColors(mode).thumb,
          borderRadius: '4px',
          border: `1px solid ${getScrollbarColors(mode).track}`,
          '&:hover': {
            backgroundColor: getScrollbarColors(mode).thumbHover,
          },
          '&:active': {
            backgroundColor: getScrollbarColors(mode).thumbActive,
          },
        },
        '&::-webkit-scrollbar-corner': {
          backgroundColor: getScrollbarColors(mode).track,
        },
        // Firefox
        scrollbarWidth: 'thin',
        scrollbarColor: `${getScrollbarColors(mode).thumb} ${
          getScrollbarColors(mode).track
        }`,
      },
      // Global body scrollbar
      body: {
        '&::-webkit-scrollbar': {
          width: '12px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: getScrollbarColors(mode).bodyTrack,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: getScrollbarColors(mode).bodyThumb,
          borderRadius: '6px',
          border: `2px solid ${getScrollbarColors(mode).bodyTrack}`,
          '&:hover': {
            backgroundColor: getScrollbarColors(mode).bodyThumbHover,
          },
        },
      },
    },
  },
});

// Scrollbar colors for different themes
const getScrollbarColors = (mode) => {
  const scrollbarThemes = {
    light: {
      track: '#f1f1f1',
      thumb: '#c1c1c1',
      thumbHover: '#a8a8a8',
      thumbActive: '#888888',
      bodyTrack: '#f7fafc',
      bodyThumb: '#cbd5e0',
      bodyThumbHover: '#a0aec0',
    },
    dark: {
      track: '#2d3748',
      thumb: '#4a5568',
      thumbHover: '#718096',
      thumbActive: '#9ca3af',
      bodyTrack: '#1a202c',
      bodyThumb: '#4a5568',
      bodyThumbHover: '#718096',
    },
    purple: {
      track: '#f4f0f7',
      thumb: '#c4a3d1',
      thumbHover: '#b088c7',
      thumbActive: '#9b7f4a',
      bodyTrack: '#faf8fc',
      bodyThumb: '#d1b3e0',
      bodyThumbHover: '#c4a3d1',
    },
  };
  return scrollbarThemes[mode] || scrollbarThemes.light;
};

// Theme configurations
const themeConfigurations = {
  light: {
    palette: {
      mode: 'light',
    },
    components: {
      ...getBaseComponents('light'),
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            padding: '0.75rem',
          },
        },
      },
    },
  },
  dark: {
    palette: {
      mode: 'dark',
    },
    components: {
      ...getBaseComponents('dark'),
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            padding: '0.75rem',
          },
        },
      },
    },
  },
  purple: {
    palette: {
      mode: 'light', // Base it on light mode for better contrast
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
    },
    components: {
      ...getBaseComponents('purple'),
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
    },
  },
};

export const getTheme = (mode = 'dark') => {
  const config = themeConfigurations[mode] || themeConfigurations.light;

  return createTheme({
    ...config,
    typography: baseTypography,
  });
};
