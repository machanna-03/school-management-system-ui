import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Stack } from '@mui/material';
import Card from '../../components/common/Card';
import { BiCalendarPlus, BiPrinter } from 'react-icons/bi';

const TimeTable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '12:30 - 01:30'];

    const schedule = {
        'Monday': [
            { subject: 'Math', room: '101', color: '#4d44b5' },
            { subject: 'Physics', room: 'Lab A', color: '#fb7d5b' },
            { subject: 'Break', room: '', color: '#f0f1f5', isBreak: true },
            { subject: 'English', room: '102', color: '#30c7ec' },
            { subject: 'History', room: '103', color: '#fcc43e' },
            { subject: 'Biology', room: 'Lab B', color: '#369c5e' }
        ],
        'Tuesday': [
            { subject: 'Chemistry', room: 'Lab A', color: '#30c7ec' },
            { subject: 'Math', room: '101', color: '#4d44b5' },
            { subject: 'Break', room: '', color: '#f0f1f5', isBreak: true },
            { subject: 'Geography', room: '104', color: '#fcc43e' },
            { subject: 'Physics', room: '101', color: '#fb7d5b' },
            { subject: 'English', room: '102', color: '#30c7ec' }
        ],
        // ... simplistic representation, reusing data for demo
        'Wednesday': [
            { subject: 'Math', room: '101', color: '#4d44b5' },
            { subject: 'Physics', room: 'Lab A', color: '#fb7d5b' },
            { subject: 'Break', room: '', color: '#f0f1f5', isBreak: true },
            { subject: 'English', room: '102', color: '#30c7ec' },
            { subject: 'History', room: '103', color: '#fcc43e' },
            { subject: 'Biology', room: 'Lab B', color: '#369c5e' }
        ],
        'Thursday': [
            { subject: 'Chemistry', room: 'Lab A', color: '#30c7ec' },
            { subject: 'Math', room: '101', color: '#4d44b5' },
            { subject: 'Break', room: '', color: '#f0f1f5', isBreak: true },
            { subject: 'Geography', room: '104', color: '#fcc43e' },
            { subject: 'Physics', room: '101', color: '#fb7d5b' },
            { subject: 'English', room: '102', color: '#30c7ec' }
        ],
        'Friday': [
            { subject: 'Math', room: '101', color: '#4d44b5' },
            { subject: 'Physics', room: 'Lab A', color: '#fb7d5b' },
            { subject: 'Break', room: '', color: '#f0f1f5', isBreak: true },
            { subject: 'English', room: '102', color: '#30c7ec' },
            { subject: 'History', room: '103', color: '#fcc43e' },
            { subject: 'Biology', room: 'Lab B', color: '#369c5e' }
        ]
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Time Table</Typography>
                    <Typography variant="body2" color="text.secondary">Class schedule management.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" startIcon={<BiPrinter />} sx={{ borderRadius: '30px', px: 3 }}>
                        Print
                    </Button>
                    <Button variant="contained" startIcon={<BiCalendarPlus />} sx={{ borderRadius: '30px', px: 3 }}>
                        New Schedule
                    </Button>
                </Box>
            </Box>

            {/* Filters */}
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, mb: 4, display: 'flex', gap: 3, boxShadow: '0px 10px 40px 0px rgba(50, 50, 50, 0.08)', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>View Schedule For:</Typography>
                <Select size="small" defaultValue="Grade 10 - A" sx={{ minWidth: 200, borderRadius: 3 }}>
                    <MenuItem value="Grade 10 - A">Grade 10 - Section A</MenuItem>
                    <MenuItem value="Grade 9 - B">Grade 9 - Section B</MenuItem>
                </Select>
            </Box>

            {/* Time Table Grid */}
            <Card sx={{ pb: 0, overflow: 'hidden' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5', borderBottom: 'none', py: 3 }}>Day / Time</TableCell>
                                {times.map((time, index) => (
                                    <TableCell key={index} align="center" sx={{ fontWeight: 600, color: '#3d4465', borderBottom: 'none', py: 3 }}>
                                        {time}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {days.map((day) => (
                                <TableRow key={day} sx={{ '& td': { borderBottom: '1px solid #f0f1f5', py: 3 } }}>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 600, color: '#3d4465', bgcolor: '#fff', position: 'sticky', left: 0 }}>
                                        {day}
                                    </TableCell>
                                    {schedule[day].map((slot, index) => (
                                        <TableCell key={index} align="center">
                                            {slot.subject === 'Break' ? (
                                                <Box sx={{ bgcolor: '#f0f1f5', py: 1, borderRadius: 2, color: '#a1a5b7', fontSize: 13, fontWeight: 500 }}>
                                                    BREAK
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        bgcolor: `${slot.color}15`,
                                                        py: 1.5,
                                                        px: 1,
                                                        borderRadius: 3,
                                                        borderLeft: `3px solid ${slot.color}`,
                                                        textAlign: 'center',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.2s',
                                                        '&:hover': { transform: 'translateY(-2px)' }
                                                    }}
                                                >
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: slot.color, fontSize: 13 }}>{slot.subject}</Typography>
                                                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>Room {slot.room}</Typography>
                                                </Box>
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default TimeTable;
