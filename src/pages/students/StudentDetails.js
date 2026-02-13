import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Grid, Typography, Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Paper, Chip, CircularProgress, Divider, Stack } from '@mui/material';
import Card from '../../components/common/Card';
import { BiDotsHorizontalRounded, BiPhone, BiEnvelope, BiMap, BiUser, BiArrowBack } from 'react-icons/bi';
import api from '../../services/api';

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    // Default to ID 1 if no ID is provided in the URL
    const studentId = id || 1;

    useEffect(() => {
        fetchStudentDetails();
    }, [studentId]);

    const fetchStudentDetails = async () => {
        try {
            console.log("Fetching details for student ID:", studentId);
            if (!studentId || studentId === 'undefined') {
                console.error("Invalid Student ID:", studentId);
                setLoading(false);
                return;
            }
            const response = await api.get(`/getStudent/${studentId}`);
            console.log("Detail Response:", response.data);
            if (response.data.student) {
                setStudent(response.data.student);
            }
        } catch (error) {
            console.error("Failed to fetch student details:", error);
            if (error.response) {
                console.error("Error Status:", error.response.status);
                console.error("Error Data:", error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    }

    if (!student) {
        return <Typography variant="h6" align="center" sx={{ mt: 10 }}>Student not found</Typography>;
    }

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton component={Link} to="/students" sx={{ bgcolor: 'white' }}><BiArrowBack /></IconButton>
                <Typography variant="h4" color="text.primary" fontWeight="bold">Student Details</Typography>
            </Box>

            {/* Header Profile Section */}
            <Box sx={{ mb: 4, position: 'relative', bgcolor: 'white', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                {/* Cover with colored shapes */}
                <Box sx={{ height: 160, bgcolor: '#4d44b5', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 40, right: 100, width: 200, height: 200, bgcolor: '#fb7d5b', borderRadius: '30px', transform: 'rotate(15deg)' }} />
                    <Box sx={{ position: 'absolute', top: 80, right: -20, width: 250, height: 250, bgcolor: '#fcc43e', borderRadius: '50%' }} />
                </Box>

                <Box sx={{ px: 5, pb: 4, mt: -8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                        <Avatar
                            src={`https://ui-avatars.com/api/?name=${student.name}&background=random&size=200`}
                            sx={{ width: 140, height: 140, border: '5px solid white', fontSize: 60 }}
                        />
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#3d4465' }}>{student.name}</Typography>
                            <Typography variant="body1" color="text.secondary">Student ID: {student.admission_number}</Typography>
                            <Chip label={student.status || 'Active'} size="small" sx={{ mt: 1, bgcolor: '#e2fbd7', color: '#34c38f', fontWeight: 'bold' }} />
                        </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ color: '#4d44b5', fontWeight: 600 }}>Class {student.class} - {student.section}</Typography>
                        <Typography variant="body2" color="text.secondary">Roll No: {student.roll_number || 'N/A'}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Tabs */}
            <Paper elevation={0} sx={{ mb: 4, borderRadius: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary" sx={{ px: 2 }}>
                    <Tab label="Profile" sx={{ fontWeight: 600, textTransform: 'none' }} />
                    {/* Add more tabs later as needed */}
                </Tabs>
            </Paper>

            {/* Tab Content: Profile */}
            {tabValue === 0 && (
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Parent Info */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Card title="Parents Details" sx={{ height: '100%' }}>
                            {student.parents && student.parents.length > 0 ? (
                                student.parents.map((parent, index) => (
                                    <Box key={parent.id} sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                                            <Avatar sx={{ bgcolor: '#fb7d5b' }}><BiUser /></Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight={700}>{parent.name} ({parent.relationship})</Typography>
                                                <Typography variant="caption" color="text.secondary">{parent.occupation}</Typography>
                                            </Box>
                                        </Box>
                                        <Stack spacing={1}>
                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                <BiPhone style={{ color: '#a098ae' }} />
                                                <Typography variant="body2" color="text.secondary">{parent.phone_number}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                <BiEnvelope style={{ color: '#a098ae' }} />
                                                <Typography variant="body2" color="text.secondary">{parent.email}</Typography>
                                            </Box>
                                        </Stack>
                                        {index < student.parents.length - 1 && <Divider sx={{ my: 2 }} />}
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">No parent details linked.</Typography>
                            )}
                        </Card>
                    </Grid>

                    {/* Personal Details */}
                    <Grid item xs={12} md={6} lg={8}>
                        <Card title="Personal Information">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Full Name</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>{student.name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>User Name (Email)</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>{student.email || 'N/A'}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Date of Birth</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>{student.dob || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Gender</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>{student.gender || 'N/A'}</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Blood Group</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>{student.blood_group || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Religion / Caste</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>{student.religion || '-'} / {student.caste || '-'}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Address</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>{student.address || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Phone</Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>{student.phone_number || 'N/A'}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default StudentDetails;
