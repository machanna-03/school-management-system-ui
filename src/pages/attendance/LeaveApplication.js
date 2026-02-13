import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    TextField,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Stack
} from '@mui/material';
import { useCookies } from 'react-cookie';
import api from '../../services/api';
import { notifications } from '@mantine/notifications';

const LeaveApplication = () => {
    const [cookies] = useCookies(['user']);
    const [leaves, setLeaves] = useState([]);
    
    // Form State
    const [leaveType, setLeaveType] = useState('Casual');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        if (!cookies.user?.id) return;
        try {
            const res = await api.get(`/getLeaves?userId=${cookies.user.id}&role=teacher`); // Assuming 'teacher' role text
            if(res.data.leaves) {
                setLeaves(res.data.leaves);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleApply = async () => {
        if (!startDate || !endDate || !reason) {
            notifications.show({title: 'Error', message: 'Please fill all fields', color: 'red'});
            return;
        }

        setLoading(true);
        // Calculate days (simple approx)
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        try {
            await api.post('/applyLeave', {
                userId: cookies.user.id, // Ensure this ID maps to 'users' table or 'teachers' table correctly. Schema uses 'users' table ID.
                userRole: 'teacher',
                leaveType,
                startDate,
                endDate,
                totalDays,
                reason
            });
            notifications.show({title: 'Success', message: 'Leave Application Submitted', color: 'green'});
            setReason('');
            setStartDate('');
            setEndDate('');
            fetchLeaves();
        } catch (error) {
            console.error(error);
            notifications.show({title: 'Error', message: 'Failed to submit', color: 'red'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Leave Application</Typography>
            
            <Grid container spacing={4}>
                {/* Application Form */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Apply for Leave</Typography>
                        <Stack spacing={3} mt={2}>
                            <TextField 
                                select 
                                label="Leave Type" 
                                value={leaveType} 
                                onChange={(e) => setLeaveType(e.target.value)}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="Casual">Casual Leave</MenuItem>
                                <MenuItem value="Sick">Sick Leave</MenuItem>
                                <MenuItem value="Medical">Medical Leave</MenuItem>
                                <MenuItem value="Emergency">Emergency</MenuItem>
                            </TextField>

                            <TextField 
                                type="date" 
                                label="Start Date" 
                                InputLabelProps={{ shrink: true }} 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)}
                                fullWidth
                                size="small"
                            />

                            <TextField 
                                type="date" 
                                label="End Date" 
                                InputLabelProps={{ shrink: true }} 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)}
                                fullWidth
                                size="small"
                            />

                            <TextField 
                                multiline 
                                rows={4} 
                                label="Reason" 
                                value={reason} 
                                onChange={(e) => setReason(e.target.value)}
                                fullWidth
                            />

                            <Button variant="contained" onClick={handleApply} disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Application'}
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>

                {/* History Table */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>My Leaves</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell>From</TableCell>
                                        <TableCell>To</TableCell>
                                        <TableCell>Days</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {leaves.map((leave) => (
                                        <TableRow key={leave.id}>
                                            <TableCell>{leave.leave_type}</TableCell>
                                            <TableCell>{leave.start_date}</TableCell>
                                            <TableCell>{leave.end_date}</TableCell>
                                            <TableCell>{leave.total_days}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={leave.status} 
                                                    color={leave.status === 'Approved' ? 'success' : (leave.status === 'Rejected' ? 'error' : 'warning')} 
                                                    size="small" 
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {leaves.length === 0 && (
                                        <TableRow><TableCell colSpan={5} align="center">No leave history</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LeaveApplication;
