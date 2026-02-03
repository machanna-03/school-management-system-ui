import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { BiUser, BiChalkboard } from 'react-icons/bi';
import { motion } from 'framer-motion';

const AttendanceOption = ({ title, icon: Icon, to, color, desc }) => (
    <Grid item xs={12} md={6}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Paper
                component={Link}
                to={to}
                sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: 5,
                    cursor: 'pointer',
                    minHeight: 300,
                    boxShadow: '0px 10px 40px 0px rgba(50, 50, 50, 0.08)',
                    transition: 'all 0.3s ease',
                    border: '1px solid transparent',
                    '&:hover': {
                        borderColor: color,
                        bgcolor: `${color}08`,
                    }
                }}
            >
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        bgcolor: `${color}20`,
                        color: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3
                    }}
                >
                    <Icon size={48} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465', mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {desc}
                </Typography>
            </Paper>
        </motion.div>
    </Grid>
);

const Attendance = () => {
    return (
        <Box>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Attendance</Typography>
                <Typography variant="body2" color="text.secondary">Select a category to manage attendance records.</Typography>
            </Box>

            <Grid container spacing={4}>
                <AttendanceOption
                    title="Student Attendance"
                    desc="Mark and view attendance records for students across all classes."
                    icon={BiUser}
                    to="/attendance/student"
                    color="#4d44b5"
                />
                <AttendanceOption
                    title="Teacher Attendance"
                    desc="Manage daily attendance logs for teaching staff."
                    icon={BiChalkboard}
                    to="/attendance/teacher"
                    color="#fb7d5b"
                />
            </Grid>
        </Box>
    );
};

export default Attendance;
