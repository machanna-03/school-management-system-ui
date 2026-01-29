import React from 'react';
import { Box, Grid, Typography, Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Card from '../../components/common/Card';
import { BiDotsHorizontalRounded, BiPhone, BiEnvelope, BiMap, BiUser } from 'react-icons/bi';

const StudentDetails = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" color="text.primary">Student Details</Typography>
            </Box>

            {/* Header Profile Section */}
            <Box sx={{ mb: 4, position: 'relative', bgcolor: 'white', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                {/* Cover with colored shapes */}
                <Box sx={{ height: 160, bgcolor: '#4d44b5', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 40, right: 100, width: 200, height: 200, bgcolor: '#fb7d5b', borderRadius: '30px', transform: 'rotate(15deg)' }} />
                    <Box sx={{ position: 'absolute', top: 80, right: -20, width: 250, height: 250, bgcolor: '#fcc43e', borderRadius: '50%' }} />
                </Box>

                <Box sx={{ px: 5, pb: 4, mt: -8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                        <Avatar
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            sx={{ width: 140, height: 140, border: '5px solid white' }}
                        />
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#3d4465' }}>Karen Hope</Typography>
                            <Typography variant="body1" color="text.secondary">Student</Typography>
                        </Box>
                    </Box>
                    <IconButton sx={{ mb: 2 }}><BiDotsHorizontalRounded size={30} /></IconButton>
                </Box>
            </Box>

            {/* Details Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Parents */}
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: '#fb7d5b', width: 50, height: 50 }}><BiUser size={24} /></Avatar>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Parents:</Typography>
                            <Typography variant="subtitle1" fontWeight={700}>Justin Hope</Typography>
                        </Box>
                    </Box>
                </Grid>
                {/* Address */}
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: '#fb7d5b', width: 50, height: 50 }}><BiMap size={24} /></Avatar>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Address:</Typography>
                            <Typography variant="subtitle1" fontWeight={700}>Jakarta, Indonesia</Typography>
                        </Box>
                    </Box>
                </Grid>
                {/* Phone */}
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: '#fb7d5b', width: 50, height: 50 }}><BiPhone size={24} /></Avatar>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Phone:</Typography>
                            <Typography variant="subtitle1" fontWeight={700}>+12 345 6789 0</Typography>
                        </Box>
                    </Box>
                </Grid>
                {/* Email */}
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: '#fb7d5b', width: 50, height: 50 }}><BiEnvelope size={24} /></Avatar>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Email:</Typography>
                            <Typography variant="subtitle1" fontWeight={700}>Historia@mail.com</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Payment History Table */}
            <Card title="Payment History">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f0f1f5' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Payment Number</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Date & Time</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1, 2, 3].map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: i === 2 ? '#369c5e' : '#ff5b5b', width: 36, height: 36 }}>N</Avatar>
                                            <Typography fontWeight={700}>#12345678{i}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>3 March 2023, 13:45 PM</TableCell>
                                    <TableCell fontWeight={700}>$ 50,036</TableCell>
                                    <TableCell>
                                        <Typography sx={{ color: i === 2 ? '#369c5e' : '#ff5b5b', fontWeight: 700 }}>
                                            {i === 2 ? 'Complete' : 'Canceled'}
                                        </Typography>
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

export default StudentDetails;
