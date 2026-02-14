import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Unauthorized = () => {
    const navigate = useNavigate();
    const { state, logout } = useApp();

    const handleGoHome = () => {
        const userRoles = state.currentUser?.roles || [state.currentUser?.role];

        if (state.currentUser?.role === 'Parent' || userRoles.includes('Parent')) {
            navigate('/parent/dashboard');
        } else if (state.currentUser?.role === 'Student' || userRoles.includes('Student')) {
            navigate('/student/dashboard');
        } else if (state.currentUser?.role === 'Teacher' || userRoles.includes('Teacher')) {
            navigate('/teacher/dashboard');
        } else {
            // Default to Admin/Staff dashboard
            navigate('/dashboard');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                p: 2
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Paper
                    elevation={24}
                    sx={{
                        p: 5,
                        textAlign: 'center',
                        borderRadius: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        maxWidth: 500
                    }}
                >
                    <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>🚫</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#2D3748', mb: 2 }}>
                        Access Denied
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#718096', mb: 4 }}>
                        You do not have permission to view this page. Please contact your administrator if you believe this is an error.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleGoHome}
                            sx={{
                                bgcolor: '#4FD1C5',
                                '&:hover': { bgcolor: '#38B2AC' },
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                fontWeight: 'bold'
                            }}
                        >
                            Go to Dashboard
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleLogout}
                            sx={{
                                color: '#E53E3E',
                                borderColor: '#E53E3E',
                                '&:hover': { bgcolor: '#FFF5F5', borderColor: '#C53030' },
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                fontWeight: 'bold'
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default Unauthorized;
