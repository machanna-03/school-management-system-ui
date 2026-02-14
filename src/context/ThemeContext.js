import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';

const ThemeContext = createContext({
    mode: 'light',
    toggleColorMode: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
    // Initialize mode from localStorage or default to 'light'
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('themeMode');
        return savedMode ? savedMode : 'light';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#4d44b5',
                        dark: '#3a3390',
                        contrastText: '#ffffff',
                    },
                    secondary: {
                        main: mode === 'light' ? '#f0f1f5' : '#2c2c3e',
                        contrastText: mode === 'light' ? '#3d4465' : '#ffffff',
                    },
                    background: {
                        default: mode === 'light' ? '#f0f1f5' : '#10101b', // Deep dark blue/black
                        paper: mode === 'light' ? '#ffffff' : '#1b1b2f',   // Slightly lighter for cards/surfaces
                    },
                    text: {
                        primary: mode === 'light' ? '#3d4465' : '#e0e0e0', // Softer white for text
                        secondary: mode === 'light' ? '#a1a5b7' : '#a1a5b7',
                        disabled: mode === 'light' ? '#bdbdbd' : '#6f7285',
                    },
                    action: {
                        hover: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)',
                        selected: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)',
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
                                borderRadius: '30px',
                                padding: '10px 24px',
                                boxShadow: 'none',
                                textTransform: 'none',
                            },
                            containedPrimary: {
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(77, 68, 181, 0.4)', // Glow effect for primary button
                                }
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                boxShadow: mode === 'light'
                                    ? '0px 10px 40px 0px rgba(50, 50, 50, 0.08)'
                                    : '0px 10px 30px 0px rgba(0, 0, 0, 0.3)', // Deeper shadow for dark mode
                                padding: '24px',
                                borderRadius: '20px',
                                backgroundImage: 'none', // Remove default MUI dark alignment gradient
                            },
                        },
                    },
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                backgroundColor: mode === 'light' ? '#ffffff' : '#1b1b2f',
                                color: mode === 'light' ? '#3d4465' : '#e0e0e0',
                                boxShadow: 'none',
                                borderBottom: mode === 'light' ? 'none' : '1px solid #2b2b40',
                            },
                        },
                    },
                    MuiDrawer: {
                        styleOverrides: {
                            paper: {
                                backgroundColor: mode === 'light' ? '#ffffff' : '#1b1b2f',
                                borderRight: 'none',
                            }
                        }
                    },
                    MuiMenu: {
                        styleOverrides: {
                            paper: {
                                backgroundColor: mode === 'light' ? '#ffffff' : '#23233c', // Slightly distinctive for menus
                                borderRadius: '12px',
                                boxShadow: mode === 'light'
                                    ? '0px 5px 20px rgba(0,0,0,0.1)'
                                    : '0px 5px 20px rgba(0,0,0,0.5)',
                            }
                        }
                    },
                    MuiListItemButton: {
                        styleOverrides: {
                            root: {
                                '&.Mui-selected': {
                                    backgroundColor: mode === 'light' ? 'rgba(77, 68, 181, 0.08)' : 'rgba(77, 68, 181, 0.2)',
                                    color: '#4d44b5',
                                    '&:hover': {
                                        backgroundColor: mode === 'light' ? 'rgba(77, 68, 181, 0.12)' : 'rgba(77, 68, 181, 0.3)',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: '#4d44b5',
                                    }
                                }
                            }
                        }
                    }
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleColorMode }}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};
