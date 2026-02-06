import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';

const WeeklyProgress = () => {
    const weeklyData = [
        { day: 'Mon', score: 85, homework: 90, classWork: 80 },
        { day: 'Tue', score: 88, homework: 85, classWork: 85 },
        { day: 'Wed', score: 92, homework: 95, classWork: 88 },
        { day: 'Thu', score: 89, homework: 80, classWork: 92 },
        { day: 'Fri', score: 94, homework: 92, classWork: 95 },
        { day: 'Sat', score: 90, homework: 88, classWork: 90 },
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Weekly Progress
            </Typography>

            <Grid container spacing={3}>
                {/* Overall Trend */}
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 400 }}>
                        <CardContent sx={{ height: '100%', p: 3 }}>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>
                                Overall Academics Trend
                            </Typography>
                            <ResponsiveContainer width="100%" height="85%">
                                <AreaChart
                                    data={weeklyData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4d44b5" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4d44b5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#A098AE' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A098AE' }} domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ stroke: '#4d44b5', strokeWidth: 1, strokeDasharray: '3 3' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#4d44b5"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Breakdown Chart */}
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 400 }}>
                        <CardContent sx={{ height: '100%', p: 3 }}>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>
                                Homework vs Classwork
                            </Typography>
                            <ResponsiveContainer width="100%" height="85%">
                                <BarChart
                                    data={weeklyData}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFF3F6" />
                                    <XAxis dataKey="day" tick={{ fill: '#A098AE' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#A098AE' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Bar dataKey="homework" fill="#4d44b5" name="Homework" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Bar dataKey="classWork" fill="#fb7d5b" name="Classwork" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WeeklyProgress;
