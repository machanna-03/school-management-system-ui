import React, { useState, useEffect } from 'react';
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
import { invokeGetApi, apiList } from '../../services/ApiServices';
import { config } from '../../config/Config';

const Performance = () => {
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const studentId = localStorage.getItem('student_id') || 1;

    useEffect(() => {
        fetchPerformance();
    }, [studentId]);

    const fetchPerformance = async () => {
        setLoading(true);
        try {
            let response = await invokeGetApi(config.getMySchool + apiList.getMarksHistory, { student_id: studentId });
            if (response.status === 200 && response.data.responseCode === "200") {
                setMarks(response.data.marks || []);
            }
        } catch (error) {
            console.error("Error fetching performance data:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Process Data for Charts ---

    // 1. Performance Trend (grouped by Exam)
    const examGroups = marks.reduce((acc, m) => {
        if (!acc[m.exam_name]) acc[m.exam_name] = { total: 0, obtained: 0, count: 0 };
        acc[m.exam_name].total += Number(m.total_marks);
        acc[m.exam_name].obtained += Number(m.marks_obtained);
        acc[m.exam_name].count += 1;
        return acc;
    }, {});

    const performanceTrend = Object.keys(examGroups).map(name => ({
        term: name,
        score: Math.round((examGroups[name].obtained / examGroups[name].total) * 100),
        avg: 75 // Mock average for comparison
    }));

    // 2. Subject Analysis (Radar)
    const subjectGroups = marks.reduce((acc, m) => {
        if (!acc[m.subject_name]) acc[m.subject_name] = { total: 0, obtained: 0 };
        acc[m.subject_name].total += Number(m.total_marks);
        acc[m.subject_name].obtained += Number(m.marks_obtained);
        return acc;
    }, {});

    const subjectAnalysis = Object.keys(subjectGroups).map(name => ({
        subject: name,
        A: Math.round((subjectGroups[name].obtained / subjectGroups[name].total) * 100),
        fullMark: 100
    }));

    // 3. Recent Assessments
    const recentAssessments = marks.slice(0, 5).map(m => ({
        title: m.exam_name,
        subject: m.subject_name,
        date: new Date(m.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        score: `${m.marks_obtained}/${m.total_marks}`,
        grade: Number(m.marks_obtained) >= Number(m.passing_marks) ? "PASS" : "FAIL"
    }));

    // Calculate GPA/Stats
    const totalPercentage = performanceTrend.length > 0
        ? Math.round(performanceTrend.reduce((acc, curr) => acc + curr.score, 0) / performanceTrend.length)
        : 0;

    const stats = [
        { label: "Overall Score", value: `${totalPercentage}%`, icon: <BiTrophy size={24} />, color: "#F39C12", bgcolor: "#FFF4DE" },
        { label: "Subject Count", value: Object.keys(subjectGroups).length, icon: <BiBook size={24} />, color: "#27AE60", bgcolor: "#E1F8E8" },
        { label: "Attendance", value: "96%", icon: <BiCheckCircle size={24} />, color: "#4d44b5", bgcolor: "#F3F4FF" },
    ];

    if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading Analytics...</Box>;


    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Performance Analytics
            </Typography>

            {/* Quick Stats Row */}
            <Grid container spacing={3} sx={{ mb: 1 }}>
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
