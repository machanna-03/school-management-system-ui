import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { BiCheckCircle, BiXCircle, BiTime } from 'react-icons/bi';

const TodaysAttendance = ({ data }) => {
    // data = { Present: 10, Absent: 2, Late: 1, ... }
    const present = data ? (data['Present'] || 0) : 0;
    const absent = data ? (data['Absent'] || 0) : 0;
    const late = data ? (data['Late'] || 0) : 0;
    const halfDay = data ? (data['Half Day'] || 0) : 0;

    const items = [
        { label: 'Present', count: present, icon: <BiCheckCircle />, color: '#4d44b5', bg: '#eef0f7' },
        { label: 'Absent', count: absent, icon: <BiXCircle />, color: '#fb7d5b', bg: '#fff2ed' },
        { label: 'Late', count: late, icon: <BiTime />, color: '#fcc43e', bg: '#fff9e6' },
    ];

    if (halfDay > 0) {
        items.push({ label: 'Half Day', count: halfDay, icon: <BiTime />, color: '#30c7ec', bg: '#eefbfd' });
    }

    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Today's Student Attendance
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {items.map((item, index) => (
                        <Grid item xs={6} key={index}>
                            <Box sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: item.bg,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <Box sx={{ fontSize: 24, color: item.color, mb: 1 }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#303972' }}>
                                    {item.count}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {item.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

export default TodaysAttendance;
