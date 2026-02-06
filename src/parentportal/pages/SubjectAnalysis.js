import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const SubjectAnalysis = () => {
    // Mock Data
    const subjectPerformance = [
        { subject: 'Math', score: 95, fullMark: 100 },
        { subject: 'Science', score: 88, fullMark: 100 },
        { subject: 'English', score: 82, fullMark: 100 },
        { subject: 'History', score: 90, fullMark: 100 },
        { subject: 'Geography', score: 85, fullMark: 100 },
        { subject: 'Physics', score: 78, fullMark: 100 },
    ];

    const strengthWeaknessData = [
        { subject: 'Math', A: 120, B: 110, fullMark: 150 },
        { subject: 'Science', A: 98, B: 130, fullMark: 150 },
        { subject: 'English', A: 86, B: 130, fullMark: 150 },
        { subject: 'History', A: 99, B: 100, fullMark: 150 },
        { subject: 'Geography', A: 85, B: 90, fullMark: 150 },
        { subject: 'Physics', A: 65, B: 85, fullMark: 150 },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Subject Analysis
            </Typography>

            <Grid container spacing={3}>
                {/* Performance Radar Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>
                                Overall Subject Performance
                            </Typography>
                            <Box sx={{ height: 350, width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectPerformance}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#A098AE', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                        <Radar
                                            name="Score"
                                            dataKey="score"
                                            stroke="#4d44b5"
                                            fill="#4d44b5"
                                            fillOpacity={0.6}
                                        />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Detailed Bar Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>
                                Marks Comparison
                            </Typography>
                            <Box sx={{ height: 350, width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={subjectPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFF3F6" />
                                        <XAxis dataKey="subject" tick={{ fill: '#A098AE' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#A098AE' }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            cursor={{ fill: 'transparent' }}
                                        />
                                        <Bar dataKey="score" fill="#FCC43E" radius={[4, 4, 0, 0]} barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SubjectAnalysis;
