import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, ButtonGroup, Chip, Stack, LinearProgress } from '@mui/material';
import { BiCalendar, BiBarChartAlt2, BiCheckCircle, BiXCircle, BiTimeFive } from 'react-icons/bi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import dayjs from 'dayjs';

const ParentAttendance = () => {
    const [viewMode, setViewMode] = useState('calendar'); // 'calendar', 'report'
    const [currentDate, setCurrentDate] = useState(dayjs());

    // Mock Attendance Data
    // Status: 'present', 'absent', 'late', 'holiday', 'weekend'
    const attendanceData = {
        '2024-02-01': 'present',
        '2024-02-02': 'present',
        '2024-02-05': 'present',
        '2024-02-06': 'late',
        '2024-02-07': 'present',
        '2024-02-08': 'absent',
        '2024-02-09': 'present',
        '2024-02-12': 'present',
        '2024-02-13': 'present',
    };

    const stats = {
        totalDays: 20,
        present: 16,
        absent: 1,
        late: 3,
        percent: 85
    };

    const doughnutData = [
        { name: 'Present', value: stats.present, color: '#4d44b5' },
        { name: 'Absent', value: stats.absent, color: '#fb7d5b' },
        { name: 'Late', value: stats.late, color: '#FCC43E' },
    ];

    const getDaysInMonth = () => {
        const days = [];
        const startOfMonth = currentDate.startOf('month');
        const endOfMonth = currentDate.endOf('month');

        // Pad start
        for (let i = 0; i < startOfMonth.day(); i++) {
            days.push(null);
        }

        // Days
        for (let i = 1; i <= endOfMonth.date(); i++) {
            days.push(currentDate.date(i));
        }

        return days;
    };

    const renderCalendarView = () => {
        const days = getDaysInMonth();
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                        <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700 }}>
                            {currentDate.format('MMMM YYYY')}
                        </Typography>
                        <Box>
                            {/* Simple Month Navigation Could Go Here */}
                        </Box>
                    </Box>

                    {/* Checkbox Legend */}
                    <Stack direction="row" spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ w: 10, h: 10, bgcolor: '#4d44b5', borderRadius: '50%', width: 10, height: 10, mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">Present</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ w: 10, h: 10, bgcolor: '#fb7d5b', borderRadius: '50%', width: 10, height: 10, mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">Absent</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ w: 10, h: 10, bgcolor: '#FCC43E', borderRadius: '50%', width: 10, height: 10, mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">Late</Typography>
                        </Box>
                    </Stack>

                    <Grid container spacing={1}>
                        {weekDays.map(day => (
                            <Grid item xs={12 / 7} key={day} sx={{ textAlign: 'center', mb: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#A098AE' }}>{day}</Typography>
                            </Grid>
                        ))}
                        {days.map((date, index) => {
                            if (!date) return <Grid item xs={12 / 7} key={`empty-${index}`} />;

                            const dateStr = date.format('YYYY-MM-DD');
                            const status = attendanceData[dateStr];
                            let bgcolor = 'transparent';
                            let color = '#303972';

                            if (status === 'present') { bgcolor = '#4d44b5'; color = 'white'; }
                            else if (status === 'absent') { bgcolor = '#fb7d5b'; color = 'white'; }
                            else if (status === 'late') { bgcolor = '#FCC43E'; color = 'white'; }

                            return (
                                <Grid item xs={12 / 7} key={index}>
                                    <Box sx={{
                                        height: 50,
                                        borderRadius: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: bgcolor,
                                        color: color,
                                        fontWeight: 600,
                                        cursor: 'default',
                                        transition: 'all 0.2s',
                                        '&:hover': { transform: 'scale(1.05)' }
                                    }}>
                                        {date.date()}
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    const renderMonthlyReport = () => (
        <Grid container spacing={3}>
            {/* Summary Cards */}
            <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                            Attendance Summary
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 3, bgcolor: '#4d44b510' }}>
                                    <Typography variant="h4" sx={{ color: '#4d44b5', fontWeight: 700 }}>{stats.present}</Typography>
                                    <Typography variant="body2" sx={{ color: '#A098AE', fontWeight: 600 }}>Total Present</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 3, bgcolor: '#fb7d5b10' }}>
                                    <Typography variant="h4" sx={{ color: '#fb7d5b', fontWeight: 700 }}>{stats.absent}</Typography>
                                    <Typography variant="body2" sx={{ color: '#A098AE', fontWeight: 600 }}>Total Absent</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 3, bgcolor: '#FCC43E10' }}>
                                    <Typography variant="h4" sx={{ color: '#FCC43E', fontWeight: 700 }}>{stats.late}</Typography>
                                    <Typography variant="body2" sx={{ color: '#A098AE', fontWeight: 600 }}>Total Late</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#303972' }}>Attendance Percentage</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#303972' }}>{stats.percent}%</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={stats.percent}
                                sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    bgcolor: '#F5F5F5',
                                    '& .MuiLinearProgress-bar': { bgcolor: '#4d44b5', borderRadius: 5 }
                                }}
                            />
                            <Typography variant="caption" sx={{ color: '#A098AE', mt: 1, display: 'block' }}>
                                You have attended {stats.present} out of {stats.totalDays} working days this month.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={doughnutData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {doughnutData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700 }}>
                    Attendance
                </Typography>

                <ButtonGroup variant="outlined" sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Button
                        onClick={() => setViewMode('calendar')}
                        sx={{
                            textTransform: 'none',
                            bgcolor: viewMode === 'calendar' ? '#4d44b5' : 'transparent',
                            color: viewMode === 'calendar' ? 'white' : '#A098AE',
                            borderColor: 'transparent',
                            '&:hover': { bgcolor: viewMode === 'calendar' ? '#3d3495' : '#f5f5f5', borderColor: 'transparent' }
                        }}
                        startIcon={<BiCalendar />}
                    >
                        Calendar View
                    </Button>
                    <Button
                        onClick={() => setViewMode('report')}
                        sx={{
                            textTransform: 'none',
                            bgcolor: viewMode === 'report' ? '#4d44b5' : 'transparent',
                            color: viewMode === 'report' ? 'white' : '#A098AE',
                            borderColor: 'transparent',
                            '&:hover': { bgcolor: viewMode === 'report' ? '#3d3495' : '#f5f5f5', borderColor: 'transparent' }
                        }}
                        startIcon={<BiBarChartAlt2 />}
                    >
                        Monthly Report
                    </Button>
                </ButtonGroup>
            </Box>

            {viewMode === 'calendar' ? renderCalendarView() : renderMonthlyReport()}

        </Box>
    );
};

export default ParentAttendance;
