import React from 'react';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Box, Typography, Button, Stack } from '@mui/material';

const data = [
    { name: 'Jan', projects: 75, revenue: 45, active: 30 },
    { name: 'Feb', projects: 85, revenue: 65, active: 25 },
    { name: 'Mar', projects: 70, revenue: 55, active: 45 },
    { name: 'Apr', projects: 98, revenue: 75, active: 30 },
    { name: 'May', projects: 50, revenue: 45, active: 25 },
    { name: 'Jun', projects: 98, revenue: 55, active: 35 },
    { name: 'Jul', projects: 80, revenue: 40, active: 20 },
    { name: 'Aug', projects: 75, revenue: 60, active: 45 },
    { name: 'Sep', projects: 95, revenue: 75, active: 35 },
    { name: 'Oct', projects: 35, revenue: 45, active: 20 },
    { name: 'Nov', projects: 75, revenue: 50, active: 35 },
    { name: 'Dec', projects: 98, revenue: 40, active: 20 },
];

const SchoolOverviewChart = () => {
    return (
        <Box sx={{ width: '100%', height: 400 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" sx={{ bgcolor: '#eee', color: '#4d44b5', boxShadow: 'none', textTransform: 'none', '&:hover': { bgcolor: '#e0e0e0' } }}>Week</Button>
                    <Button variant="text" sx={{ color: 'text.secondary', textTransform: 'none' }}>Month</Button>
                    <Button variant="text" sx={{ color: 'text.secondary', textTransform: 'none' }}>Year</Button>
                    <Button variant="text" sx={{ color: 'text.secondary', textTransform: 'none' }}>All</Button>
                </Stack>
            </Box>

            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart
                    data={data}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                    barCategoryGap="40%"
                >
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
                    <Bar dataKey="projects" fill="#4d44b5" radius={[5, 5, 0, 0]} barSize={8} />
                    <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="active" stroke="#ff5b5b" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                </ComposedChart>
            </ResponsiveContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#4d44b5' }} />
                    <Typography variant="body2" color="text.secondary">Number of Projects</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#4caf50' }} />
                    <Typography variant="body2" color="text.secondary">Revenue</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5b5b' }} />
                    <Typography variant="body2" color="text.secondary">Active Projects</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SchoolOverviewChart;
