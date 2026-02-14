import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    TextField
} from '@mui/material';
import api from '../../services/api';
import { useCookies } from 'react-cookie';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const MyAttendance = () => {
    const [cookies] = useCookies(['user']);
    const [attendance, setAttendance] = useState([]);
    const [stats, setStats] = useState({ present: 0, absent: 0, late: 0 });
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

    useEffect(() => {
        fetchAttendance();
    }, [month]);

    const fetchAttendance = async () => {
        if (!cookies.user?.id) return;
        try {
            // We need a new endpoint or update existing to get attendance by student_id
            // For now assuming we can filter /getStudentAttendance or similar, but typically we need a specific 'my-attendance' endpoint.
            // Let's assume we create a new helper or reuse logic. 
            // Actually, the plan mentions `MyAttendance.js`. I will need to ensure the API supports fetching by just student_id across dates.
            // The current `getStudentAttendance` is by Section & Date (Daily). 
            // We need a generic "Get My Attendance Range" endpoint.

            // Temporary: Using a mocked response structure until API is updated or we use a strict "Get All"
            // For this implementation, I will call a new endpoint `getMyAttendance` which I will implement in PHP shortly.
            const res = await api.get(`/getMyAttendance?studentId=${cookies.user.id}&month=${month}`);
            if (res.data.attendance) {
                setAttendance(res.data.attendance);
                calculateStats(res.data.attendance);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const calculateStats = (data) => {
        let present = 0, absent = 0, late = 0;
        data.forEach(r => {
            if (r.status === 'Present') present++;
            else if (r.status === 'Absent') absent++;
            else if (r.status === 'Late') late++;
        });
        setStats({ present, absent, late });
    };

    const COLORS = ['#4caf50', '#f44336', '#ff9800'];
    const pieData = [
        { name: 'Present', value: stats.present },
        { name: 'Absent', value: stats.absent },
        { name: 'Late', value: stats.late },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>My Attendance</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Attendance Record</Typography>
                            <TextField
                                type="month"
                                size="small"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            />
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Check In</TableCell>
                                        <TableCell>Check Out</TableCell>
                                        <TableCell>Remarks</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attendance.map((row, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    color={row.status === 'Present' ? 'success' : (row.status === 'Absent' ? 'error' : 'warning')}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>{row.check_in_time || '-'}</TableCell>
                                            <TableCell>{row.check_out_time || '-'}</TableCell>
                                            <TableCell>{row.remarks || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                    {attendance.length === 0 && (
                                        <TableRow><TableCell colSpan={5} align="center">No records found for this month</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>Overview</Typography>
                        <Box height={300}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                        <Box mt={2}>
                            <Typography variant="body2" color="text.secondary">Total Working Days: {attendance.length}</Typography>
                            <Typography variant="body2" color="success.main">Present: {stats.present}</Typography>
                            <Typography variant="body2" color="error.main">Absent: {stats.absent}</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MyAttendance;
