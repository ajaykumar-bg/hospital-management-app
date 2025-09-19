import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  ErrorOutline as ErrorIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth='md' sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Box sx={{ mb: 3 }}>
              <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
              <Typography
                variant='h4'
                component='h1'
                gutterBottom
                color='error'
              >
                Oops! Something went wrong
              </Typography>
              <Typography variant='h6' color='text.secondary' gutterBottom>
                We encountered an unexpected error in the Hospital Management
                System
              </Typography>
            </Box>

            <Alert severity='error' sx={{ mb: 3, textAlign: 'left' }}>
              <AlertTitle>Error Details</AlertTitle>
              {this.state.error && this.state.error.toString()}
              {process.env.NODE_ENV === 'development' &&
                this.state.errorInfo && (
                  <Box
                    component='pre'
                    sx={{ mt: 1, fontSize: '0.75rem', overflow: 'auto' }}
                  >
                    {this.state.errorInfo.componentStack}
                  </Box>
                )}
            </Alert>

            <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
              This error has been logged and our team has been notified. You can
              try refreshing the page or return to the dashboard.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant='contained'
                startIcon={<RefreshIcon />}
                onClick={this.handleRefresh}
                size='large'
              >
                Refresh Page
              </Button>
              <Button
                variant='outlined'
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
                size='large'
              >
                Go to Dashboard
              </Button>
            </Box>

            <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant='caption' color='text.secondary'>
                If this problem persists, please contact the IT support team
                with the error details above.
              </Typography>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
