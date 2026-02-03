import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, Select, MenuItem, Stack, Chip, Switch } from '@mui/material';
import Card from '../../components/common/Card';
import { BiCalendar } from 'react-icons/bi';

const TeacherAttendance = () => {
    const [date, setDate] = useState(new Date());

    const teachers = [
        { id: 'T001', name: 'John Doe', subject: 'Math', status: true, timeIn: '08:00 AM', timeOut: '04:00 PM', color: '#4d44b5' },
        { id: 'T002', name: 'Jane Smith', subject: 'Physics', status: true, timeIn: '08:15 AM', timeOut: '04:00 PM', color: '#fb7d5b' },
        { id: 'T003', name: 'Alice Johnson', subject: 'English', status: false, timeIn: '-', timeOut: '-', color: '#30c7ec' },
        { id: 'T004', name: 'Robert Brown', subject: 'History', status: true, timeIn: '07:55 AM', timeOut: '03:30 PM', color: '#fcc43e' },
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Teacher Attendance</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">Daily Log</Typography>
                    <Typography variant="body2" color="text.secondary">•</Typography>
                    <Typography variant="body2" color="text.secondary">{date.toDateString()}</Typography>
                </Box>
            </Box>

            {/* Controls */}
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 10px 40px 0px rgba(50, 50, 50, 0.08)' }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button variant="outlined" startIcon={<BiCalendar />} sx={{ color: 'text.primary', borderColor: '#c4c4c4', borderRadius: 3, px: 3 }}>
                        {date.toLocaleDateString()}
                    </Button>
                </Box>
                <Button variant="contained" sx={{ borderRadius: '30px', px: 4 }}>Download Report</Button>
            </Box>

            {/* Teacher List */}
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ '& th': { fontWeight: 600, color: 'text.secondary' } }}>
                                <TableCell>Teacher ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Check In</TableCell>
                                <TableCell align="center">Check Out</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teachers.map((teacher, i) => (
                                <TableRow key={i} hover sx={{ '& td': { py: 2.5 } }}>
                                    <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{teacher.id}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: teacher.color, width: 36, height: 36, fontSize: 14 }}>{teacher.name.charAt(0)}</Avatar>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>{teacher.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>{teacher.subject}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={teacher.status ? 'Present' : 'Absent'}
                                            size="small"
                                            sx={{
                                                bgcolor: teacher.status ? '#e6fffa' : '#fff5f5',
                                                color: teacher.status ? '#369c5e' : '#ff5b5b',
                                                fontWeight: 600,
                                                minWidth: 80
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'text.secondary' }}>{teacher.timeIn}</TableCell>
                                    <TableCell align="center" sx={{ color: 'text.secondary' }}>{teacher.timeOut}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" variant="outlined" sx={{ borderRadius: 5 }}>Log Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </Box>
    );
};

export default TeacherAttendance;
