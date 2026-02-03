import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, Select, MenuItem, Stack, Chip, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Card from '../../components/common/Card';
import { BiCalendar, BiSearch } from 'react-icons/bi';
import { DatePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';

const StudentAttendance = () => {
    const [date, setDate] = useState(new Date());

    const students = [
        { id: 'S001', name: 'Samantha William', roll: '101', status: 'present', img: 'SW', color: '#fb7d5b' },
        { id: 'S002', name: 'Tony Soap', roll: '102', status: 'absent', img: 'TS', color: '#fcc43e' },
        { id: 'S003', name: 'Karen Hope', roll: '103', status: 'present', img: 'KH', color: '#30c7ec' },
        { id: 'S004', name: 'Jordan Nico', roll: '104', status: 'late', img: 'JN', color: '#4d44b5' },
        { id: 'S005', name: 'Nadila Adja', roll: '105', status: 'present', img: 'NA', color: '#369c5e' },
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Student Attendance</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">Class VII A</Typography>
                    <Typography variant="body2" color="text.secondary">•</Typography>
                    <Typography variant="body2" color="text.secondary">{date.toDateString()}</Typography>
                </Box>
            </Box>

            {/* Filters */}
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, mb: 4, display: 'flex', flexWrap: 'wrap', gap: 3, boxShadow: '0px 10px 40px 0px rgba(50, 50, 50, 0.08)' }}>
                <Box sx={{ minWidth: 200 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>Select Class</Typography>
                    <Select fullWidth size="small" defaultValue="VII A" sx={{ borderRadius: 3 }}>
                        <MenuItem value="VII A">Class VII A</MenuItem>
                        <MenuItem value="VII B">Class VII B</MenuItem>
                        <MenuItem value="VIII A">Class VIII A</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ minWidth: 200 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>Select Section</Typography>
                    <Select fullWidth size="small" defaultValue="A" sx={{ borderRadius: 3 }}>
                        <MenuItem value="A">Section A</MenuItem>
                        <MenuItem value="B">Section B</MenuItem>
                    </Select>
                </Box>
                {/* Date Picker Placeholder - In a real app use a proper DatePicker component aligned here */}
                <Box sx={{ minWidth: 200 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>Select Date</Typography>
                    <Button variant="outlined" startIcon={<BiCalendar />} fullWidth sx={{ justifyContent: 'flex-start', color: 'text.primary', borderColor: '#c4c4c4', borderRadius: 3, py: 1 }}>
                        {date.toLocaleDateString()}
                    </Button>
                </Box>

                <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Button variant="contained" sx={{ borderRadius: '30px', px: 4 }}>Load Data</Button>
                </Box>
            </Box>

            {/* Attendance Table */}
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ '& th': { fontWeight: 600, color: 'text.secondary' } }}>
                                <TableCell>Roll No</TableCell>
                                <TableCell>Student Name</TableCell>
                                <TableCell align="center">Attendance Status</TableCell>
                                <TableCell>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((std, i) => (
                                <TableRow key={i} hover sx={{ '& td': { py: 2 } }}>
                                    <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>#{std.roll}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: std.color, width: 36, height: 36, fontSize: 14 }}>{std.img}</Avatar>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>{std.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <RadioGroup row defaultValue={std.status} sx={{ justifyContent: 'center' }}>
                                            <FormControlLabel
                                                value="present"
                                                control={<Radio size="small" sx={{ color: '#369c5e', '&.Mui-checked': { color: '#369c5e' } }} />}
                                                label={<Typography variant="body2" sx={{ color: '#369c5e', fontWeight: 500 }}>Present</Typography>}
                                            />
                                            <FormControlLabel
                                                value="absent"
                                                control={<Radio size="small" sx={{ color: '#ff5b5b', '&.Mui-checked': { color: '#ff5b5b' } }} />}
                                                label={<Typography variant="body2" sx={{ color: '#ff5b5b', fontWeight: 500 }}>Absent</Typography>}
                                            />
                                            <FormControlLabel
                                                value="late"
                                                control={<Radio size="small" sx={{ color: '#fcc43e', '&.Mui-checked': { color: '#fcc43e' } }} />}
                                                label={<Typography variant="body2" sx={{ color: '#fcc43e', fontWeight: 500 }}>Late</Typography>}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ width: '100%', maxWidth: 200, bgcolor: '#f0f1f5', borderRadius: 2, height: 36 }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f0f1f5' }}>
                    <Button variant="contained" size="large" sx={{ borderRadius: '30px', px: 6 }}>Save Attendance</Button>
                </Box>
            </Card>

        </Box>
    );
};

export default StudentAttendance;
