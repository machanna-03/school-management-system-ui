import React from "react";
import { Box, Grid, Typography, Card, CardContent, Button, Stack, Chip, Avatar } from "@mui/material";
import { BiUser, BiBook, BiCalendarEvent, BiMessageDetail } from "react-icons/bi";

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

const TeacherDashboard = () => {
    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ color: '#303972', fontWeight: 700 }}>Welcome, Mrs. Thomas! 👋</Typography>
                    <Typography variant="body1" sx={{ color: '#A098AE' }}>You have 2 pending assignments to grade.</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 600 }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Students" value="45" icon={<BiUser />} color="#4d44b5" bgcolor="#F3F4FF" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Classes" value="5" icon={<BiBook />} color="#FB7D5B" bgcolor="#FFF4DE" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Events" value="3" icon={<BiCalendarEvent />} color="#FCC43E" bgcolor="#FEF6E6" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Messages" value="12" icon={<BiMessageDetail />} color="#303972" bgcolor="#E8EAF6" />
                </Grid>
            </Grid>

            {/* Main Content */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700 }}>Today's Classes</Typography>
                                <Button size="small" sx={{ textTransform: 'none' }}>View Schedule</Button>
                            </Box>

                            <Stack spacing={2}>
                                {['5-A: Science - 9:00 AM', '4-B: Math - 10:30 AM', '6-C: Science - 1:00 PM', 'Free Period - 2:30 PM'].map((cls, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f9fafb', borderRadius: 3 }}>
                                        <Box sx={{
                                            width: 50, height: 50, borderRadius: 3, mr: 2,
                                            bgcolor: idx === 0 ? '#FB7D5B' : 'white',
                                            color: idx === 0 ? 'white' : '#A098AE',
                                            border: idx === 0 ? 'none' : '1px solid #eee',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                                        }}>
                                            {cls.split(' - ')[0].substring(0, 3)}
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" fontWeight={700} color="#303972">{cls.split(' - ')[0]}</Typography>
                                            <Typography variant="caption" color="text.secondary">{cls.split(' - ')[1]}</Typography>
                                        </Box>
                                        <Button variant={idx === 0 ? "contained" : "outlined"} size="small" sx={{ borderRadius: 2 }}>
                                            {idx === 0 ? "Started" : "Details"}
                                        </Button>
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Panel */}
                <Grid item xs={12} md={4}>
                    {/* Pending Grading */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>Grading Tasks</Typography>

                            <Stack spacing={3}>
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle2" fontWeight={600} color="#303972">Class 5-A: Unit Test</Typography>
                                        <Chip label="High Priority" size="small" color="error" />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>submitted by 28/30 students</Typography>
                                    <Button variant="outlined" size="small" fullWidth sx={{ borderRadius: 2 }}>Grade Now</Button>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TeacherDashboard;
