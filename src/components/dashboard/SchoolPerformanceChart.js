import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
    { name: 'Week 01', thisWeek: 100, lastWeek: 480 },
    { name: 'Week 02', thisWeek: 400, lastWeek: 150 },
    { name: 'Week 03', thisWeek: 200, lastWeek: 400 },
    { name: 'Week 04', thisWeek: 400, lastWeek: 100 },
    { name: 'Week 05', thisWeek: 100, lastWeek: 480 },
    { name: 'Week 06', thisWeek: 420, lastWeek: 100 },
];

const SchoolPerformanceChart = () => {
    return (
        <Box sx={{ width: '100%', height: 350 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#4d44b5' }} />
                    <Typography variant="body2" color="text.secondary">This Week</Typography>
                    <Typography variant="body2" fontWeight={600}>1.245</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#fb7d5b' }} />
                    <Typography variant="body2" color="text.secondary">Last Week</Typography>
                    <Typography variant="body2" fontWeight={600}>1.356</Typography>
                </Box>
            </Box>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4d44b5" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#4d44b5" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fb7d5b" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#fb7d5b" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#a0a0a0', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#a0a0a0', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="thisWeek"
                        stroke="#4d44b5"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorThisWeek)"
                    />
                    <Area
                        type="monotone"
                        dataKey="lastWeek"
                        stroke="#fb7d5b"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorLastWeek)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default SchoolPerformanceChart;
