import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { BiUser, BiChalkboard, BiCalendarCheck } from 'react-icons/bi';
import { motion } from 'framer-motion';

const AttendanceOption = ({ title, icon: Icon, to, color, desc }) => (
    <Grid item xs={12} md={4}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Paper
                component={Link}
                to={to}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: 5,
                    cursor: 'pointer',
                    minHeight: 250,
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
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: `${color}20`,
                        color: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3
                    }}
                >
                    <Icon size={40} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#3d4465', mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {desc}
                </Typography>
            </Paper>
        </motion.div>
    </Grid>
);

const AttendanceDashboard = () => {
    return (
        <Box>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h3" color="text.primary" sx={{ mb: 1, fontWeight:700 }}>Attendance & Leaves</Typography>
                <Typography variant="body1" color="text.secondary">Manage attendance records and leave applications for the institute.</Typography>
            </Box>

            <Grid container spacing={4}>
                <AttendanceOption
                    title="Student Attendance"
                    desc="Mark and view daily/period attendance for students."
                    icon={BiUser}
                    to="/attendance/student"
                    color="#4d44b5"
                />
                <AttendanceOption
                    title="Teacher Attendance"
                    desc="Manage daily log and attendance for teaching staff."
                    icon={BiChalkboard}
                    to="/attendance/teacher"
                    color="#fb7d5b"
                />
                <AttendanceOption
                    title="Leave Approvals"
                    desc="Review and approve leave applications from teachers and students."
                    icon={BiCalendarCheck}
                    to="/attendance/leaves"
                    color="#30c7ec"
                />
            </Grid>
        </Box>
    );
};

export default AttendanceDashboard;
