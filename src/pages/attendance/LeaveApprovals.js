import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Stack,
    Tabs,
    Tab
} from '@mui/material';
import api from '../../services/api';
import { notifications } from '@mantine/notifications';
import { useCookies } from 'react-cookie';

const LeaveApprovals = () => {
    const [cookies] = useCookies(['user']);
    const [leaves, setLeaves] = useState([]);
    const [statusFilter, setStatusFilter] = useState('Pending');

    useEffect(() => {
        fetchLeaves();
    }, [statusFilter]);

    const fetchLeaves = async () => {
        try {
            const res = await api.get(`/getLeaves?status=${statusFilter}`);
            if (res.data.leaves) {
                setLeaves(res.data.leaves);
            } else {
                setLeaves([]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdate = async (leaveId, newStatus) => {
        try {
            await api.post('/updateLeaveStatus', {
                leaveId,
                status: newStatus,
                approvedBy: cookies.user?.id
            });
            notifications.show({ title: 'Success', message: `Leave ${newStatus}`, color: 'green' });
            fetchLeaves();
        } catch (error) {
            console.error(error);
            notifications.show({ title: 'Error', message: 'Failed to update', color: 'red' });
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Leave Management</Typography>

            <Paper sx={{ p: 2, borderRadius: 3, mb: 3 }}>
                <Tabs value={statusFilter} onChange={(e, val) => setStatusFilter(val)} indicatorColor="primary" textColor="primary">
                    <Tab value="Pending" label="Pending Requests" />
                    <Tab value="Approved" label="Approved History" />
                    <Tab value="Rejected" label="Rejected History" />
                </Tabs>
            </Paper>

            <Paper sx={{ borderRadius: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f4f5ff' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Applicant</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Dates</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Days</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Reason</TableCell>
                                {statusFilter === 'Pending' && <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2, textAlign: 'right' }}>Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leaves.map((leave, i) => (
                                <TableRow
                                    key={leave.id}
                                    hover
                                    sx={{
                                        bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                        '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                        '&:hover': { bgcolor: '#f0f1ff !important' },
                                        '&:last-child td': { borderBottom: 0 }
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: 'bold' }}>{leave.user_name}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{leave.user_role}</TableCell>
                                    <TableCell>{leave.leave_type}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{leave.start_date}</Typography>
                                        <Typography variant="caption" color="text.secondary">to {leave.end_date}</Typography>
                                    </TableCell>
                                    <TableCell>{leave.total_days}</TableCell>
                                    <TableCell sx={{ maxWidth: 300 }}>{leave.reason}</TableCell>

                                    {statusFilter === 'Pending' && (
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleUpdate(leave.id, 'Approved')}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleUpdate(leave.id, 'Rejected')}
                                                >
                                                    Reject
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                            {leaves.length === 0 && (
                                <TableRow><TableCell colSpan={7} align="center">No {statusFilter.toLowerCase()} leaves found</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default LeaveApprovals;
