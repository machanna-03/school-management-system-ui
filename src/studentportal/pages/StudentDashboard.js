import React from "react";
import { Box, Grid, Typography, Card, CardContent, Button, Stack, Chip, Avatar, LinearProgress } from "@mui/material";
import { BiBook, BiCheckCircle, BiTime, BiCalendarEvent, BiTrendingUp } from "react-icons/bi";

const StatCard = ({ title, value, icon, color, bgcolor }) => (
    <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
                <Typography color="text.secondary" variant="body2" fontWeight={600} sx={{ mb: 1 }}>{title}</Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#303972' }}>{value}</Typography>
            </Box>
            <Box sx={{
                width: 60, height: 60, borderRadius: '50%',
                bgcolor: bgcolor, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem'
            }}>
                {icon}
            </Box>
        </CardContent>
    </Card>
);

const StudentDashboard = () => {
    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ color: '#303972', fontWeight: 700 }}>Hello, Rahul! 👋</Typography>
                    <Typography variant="body1" sx={{ color: '#A098AE' }}>Here's what's happening in your class today.</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 600 }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Attendance" value="96%" icon={<BiCheckCircle />} color="#4d44b5" bgcolor="#F3F4FF" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Assignments" value="12/15" icon={<BiBook />} color="#FB7D5B" bgcolor="#FFF4DE" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Upcoming Exams" value="2" icon={<BiCalendarEvent />} color="#FCC43E" bgcolor="#FEF6E6" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Average Grade" value="A1" icon={<BiTrendingUp />} color="#303972" bgcolor="#E8EAF6" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Upcoming Schedule */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700 }}>Upcoming Schedule</Typography>
                                <Button size="small" sx={{ textTransform: 'none' }}>View Timetable</Button>
                            </Box>

                            <Stack spacing={2}>
                                {['Mathematics - 9:00 AM', 'Science - 10:30 AM', 'History - 1:00 PM', 'Physical Ed - 2:30 PM'].map((cls, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f9fafb', borderRadius: 3 }}>
                                        <Box sx={{
                                            width: 50, height: 50, borderRadius: 3, mr: 2,
                                            bgcolor: idx === 0 ? '#4d44b5' : 'white',
                                            color: idx === 0 ? 'white' : '#A098AE',
                                            border: idx === 0 ? 'none' : '1px solid #eee',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                                        }}>
                                            {cls.split(' - ')[0].substring(0, 2)}
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" fontWeight={700} color="#303972">{cls.split(' - ')[0]}</Typography>
                                            <Typography variant="caption" color="text.secondary">Upcoming Class</Typography>
                                        </Box>
                                        <Chip label={cls.split(' - ')[1]} size="small" />
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Panel */}
                <Grid item xs={12} md={4}>
                    {/* Homework Due */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>Homework Due</Typography>

                            <Stack spacing={3}>
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle2" fontWeight={600} color="#303972">Math: Algebra Problems</Typography>
                                        <Typography variant="caption" color="error">Due Today</Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>Chapter 4, Ex 4.2</Typography>
                                    <Button variant="outlined" size="small" fullWidth sx={{ borderRadius: 2 }}>Submit</Button>
                                </Box>

                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle2" fontWeight={600} color="#303972">Science: Lab Report</Typography>
                                        <Typography variant="caption" color="#F39C12">Due Tomorrow</Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>Photosynthesis Experiment</Typography>
                                    <Button variant="outlined" size="small" fullWidth sx={{ borderRadius: 2 }}>Pending</Button>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentDashboard;
