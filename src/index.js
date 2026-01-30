import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Akademi Theme Definition
const theme = createTheme({
  palette: {
    primary: {
      main: '#4d44b5',
      dark: '#3a3390',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f0f1f5', // Background
      contrastText: '#3d4465',
    },
    background: {
      default: '#f0f1f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#3d4465', // Text Dark
      secondary: '#a1a5b7', // Text Light
    },
    success: { main: '#369c5e' },
    warning: { main: '#ff9f43' },
    error: { main: '#ff5b5b' },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontWeight: 600, fontSize: '24px' },
    h2: { fontWeight: 600, fontSize: '20px' },
    h3: { fontWeight: 600, fontSize: '18px' },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px', // Pill shape
          padding: '10px 24px',
          boxShadow: 'none',
        },
        containedPrimary: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 10px 40px 0px rgba(50, 50, 50, 0.08)',
          padding: '24px',
        },
      },
    },
   
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
