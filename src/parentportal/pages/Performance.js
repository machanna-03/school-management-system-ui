import React from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Chip,
    Stack, Avatar, LinearProgress, Divider
} from '@mui/material';
import {
    BiTrendingUp, BiTrophy, BiBook, BiTargetLock, BiTime, BiCheckCircle
} from 'react-icons/bi';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const Performance = () => {

    // --- Mock Data ---
    const performanceTrend = [
        { term: 'Term 1', score: 82, avg: 75 },
        { term: 'Mid-Term', score: 85, avg: 76 },
        { term: 'Term 2', score: 88, avg: 78 },
        { term: 'Finals', score: 91, avg: 80 },
    ];

    const subjectAnalysis = [
        { subject: 'Math', A: 95, fullMark: 100 },
        { subject: 'Science', A: 88, fullMark: 100 },
        { subject: 'English', A: 92, fullMark: 100 },
        { subject: 'History', A: 85, fullMark: 100 },
        { subject: 'Geography', A: 90, fullMark: 100 },
        { subject: 'Arts', A: 98, fullMark: 100 },
    ];

    const recentAssessments = [
        { title: "Algebra Unit Test", subject: "Mathematics", date: "15 Jan", score: "18/20", grade: "A1" },
        { title: "Science Project", subject: "Science", date: "12 Jan", score: "45/50", grade: "A1" },
        { title: "History Essay", subject: "Social Studies", date: "10 Jan", score: "22/30", grade: "B1" },
    ];

    const stats = [
        { label: "Current GPA", value: "3.8/4.0", icon: <BiTrophy size={24} />, color: "#F39C12", bgcolor: "#FFF4DE" },
        { label: "Class Rank", value: "Top 5%", icon: <BiTrendingUp size={24} />, color: "#27AE60", bgcolor: "#E1F8E8" },
        { label: "Attendance", value: "96%", icon: <BiCheckCircle size={24} />, color: "#4d44b5", bgcolor: "#F3F4FF" },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Performance Analytics
            </Typography>

            {/* Quick Stats Row */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Box sx={{
                                    width: 60, height: 60, borderRadius: '50%',
                                    bgcolor: stat.bgcolor, color: stat.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#303972' }}>{stat.value}</Typography>
                                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                {/* Main Academic Trajectory Chart */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', display: 'flex', alignItems: 'center' }}>
                                    <BiTrendingUp style={{ marginRight: 10 }} /> ACADEMIC TRAJECTORY
                                </Typography>
                                <Chip label="Yearly Progress" size="small" sx={{ bgcolor: '#F3F4FF', color: '#4d44b5', fontWeight: 600 }} />
                            </Box>

                            <Box sx={{ height: 350, width: '100%' }}>
                                <ResponsiveContainer>
                                    <LineChart data={performanceTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                        <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{ fill: '#A098AE', dy: 10 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A098AE' }} />
                                        <RechartsTooltip
                                            contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Line type="monotone" dataKey="score" name="Student Score" stroke="#4d44b5" strokeWidth={3} dot={{ r: 6, fill: '#4d44b5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="avg" name="Class Average" stroke="#FFB549" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#FFB549', strokeWidth: 2, stroke: '#fff' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Recent Assessments List */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BiBook style={{ marginRight: 10 }} /> RECENT ASSESSMENTS
                            </Typography>
                            <Stack spacing={2}>
                                {recentAssessments.map((item, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid #f0f0f0', borderRadius: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{
                                                width: 45, height: 45, borderRadius: 2,
                                                bgcolor: item.grade.startsWith('A') ? '#E1F8E8' : '#FFF4DE',
                                                color: item.grade.startsWith('A') ? '#27AE60' : '#F39C12',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                                            }}>
                                                {item.grade}
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#303972' }}>{item.title}</Typography>
                                                <Typography variant="caption" sx={{ color: '#A098AE' }}>{item.subject} • {item.date}</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#303972' }}>{item.score}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column (Subject Analysis Radar) */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BiTargetLock style={{ marginRight: 10 }} /> SUBJECT ANALYSIS
                            </Typography>

                            <Box sx={{ height: 300, width: '100%', mb: 4 }}>
                                <ResponsiveContainer>
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectAnalysis}>
                                        <PolarGrid stroke="#E0E0E0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#303972', fontSize: 12, fontWeight: 600 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar name="Score" dataKey="A" stroke="#4d44b5" strokeWidth={2} fill="#4d44b5" fillOpacity={0.3} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#303972', mb: 2 }}>Strongest Areas</Typography>
                            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                                <Chip label="Arts (98%)" size="small" sx={{ bgcolor: '#E1F8E8', color: '#27AE60', fontWeight: 700 }} />
                                <Chip label="Math (95%)" size="small" sx={{ bgcolor: '#E1F8E8', color: '#27AE60', fontWeight: 700 }} />
                            </Stack>

                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#303972', mb: 2 }}>Areas for Improvement</Typography>
                            <Stack direction="row" spacing={1}>
                                <Chip label="History (85%)" size="small" sx={{ bgcolor: '#FFF4DE', color: '#F39C12', fontWeight: 700 }} />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Performance;
