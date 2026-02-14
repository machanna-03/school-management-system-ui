import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

const StudentGenderChart = ({ data }) => {
    // Data extraction
    // API returns { "Male": count, "Female": count }
    const maleCount = data ? (data['Male'] || 0) : 0;
    const femaleCount = data ? (data['Female'] || 0) : 0;

    // Transform for Recharts
    const chartData = [
        { name: 'Boys', value: maleCount, color: '#4d44b5' },
        { name: 'Girls', value: femaleCount, color: '#fb7d5b' },
    ];

    // If no data to display
    if (maleCount === 0 && femaleCount === 0) {
        return (
            <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
                <Typography color="textSecondary">No Student Data Available</Typography>
            </Paper>
        )
    }

    return (
        <Paper sx={{ p: 2, height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Students by Gender
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%', minHeight: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default StudentGenderChart;
