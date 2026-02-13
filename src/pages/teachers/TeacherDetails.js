import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Grid, Avatar, IconButton, Stack, Paper, Chip, CircularProgress, Divider } from '@mui/material';
import Card from '../../components/common/Card';
import { BiDotsHorizontalRounded, BiUser, BiMap, BiPhone, BiEnvelope, BiArrowBack } from 'react-icons/bi';
import api from '../../services/api';

const TeacherDetails = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    // Default to ID 1 if no ID is provided
    const teacherId = id || 1;

    useEffect(() => {
        fetchTeacherDetails();
    }, [teacherId]);

    const fetchTeacherDetails = async () => {
        try {
            console.log("Fetching details for teacher ID:", teacherId);
            if (!teacherId || teacherId === 'undefined') {
                console.error("Invalid Teacher ID:", teacherId);
                setLoading(false);
                return;
            }
            const response = await api.get(`/getTeacher/${teacherId}`);
            if (response.data.teacher) {
                setTeacher(response.data.teacher);
            }
        } catch (error) {
            console.error("Failed to fetch teacher details:", error);
            if (error.response) {
                console.error("Error Status:", error.response.status);
                console.error("Error Data:", error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    }

    if (!teacher) {
        return <Typography variant="h6" align="center" sx={{ mt: 10 }}>Teacher not found</Typography>;
    }

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton component={Link} to="/teachers" sx={{ bgcolor: 'white' }}><BiArrowBack /></IconButton>
                <Typography variant="h4" color="text.primary" fontWeight="bold">Teacher Details</Typography>
            </Box>

            <Card sx={{ overflow: 'hidden', p: 0 }}>
                {/* Header Section */}
                <Box sx={{
                    height: 180,
                    bgcolor: '#4d44b5',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Decorative Arcs */}
                    <Box sx={{
                        position: 'absolute',
                        bottom: -100,
                        right: 80,
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        border: '15px solid #ffa502', // Orange
                        opacity: 0.8
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        bottom: -150,
                        right: -50,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        border: '15px solid #fcc43e', // Yellow
                        opacity: 0.8
                    }} />
                </Box>

                {/* Profile Info Section */}
                <Box sx={{ px: 4, pb: 4, mt: -8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Avatar
                            src={`https://ui-avatars.com/api/?name=${teacher.name}&background=random&size=200`}
                            sx={{
                                width: 150,
                                height: 150,
                                border: '5px solid white',
                                boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
                                fontSize: 50
                            }}
                        />
                        {/* <IconButton sx={{ mt: 9 }}>
                            <BiDotsHorizontalRounded size={30} color="#a098ae" />
                        </IconButton> */}
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465', mb: 1 }}>{teacher.name}</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ color: '#4d44b5', fontWeight: 600 }}>{teacher.designation || 'Teacher'}</Typography>
                            <Chip label={teacher.department} size="small" sx={{ bgcolor: '#eee', fontWeight: 'bold' }} />
                        </Stack>
                    </Box>

                    {/* Contact Icons Grid */}
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ bgcolor: '#ff7d5b', p: 1.5, borderRadius: '50%', color: 'white', display: 'flex' }}>
                                    <BiUser size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Gender:</Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>{teacher.gender}</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ bgcolor: '#fcc43e', p: 1.5, borderRadius: '50%', color: 'white', display: 'flex' }}>
                                    <BiMap size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Address:</Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>{teacher.city}, {teacher.country}</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ bgcolor: '#4d44b5', p: 1.5, borderRadius: '50%', color: 'white', display: 'flex' }}>
                                    <BiPhone size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Phone:</Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>{teacher.phone_number}</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ bgcolor: '#fb7d5b', p: 1.5, borderRadius: '50%', color: 'white', display: 'flex' }}>
                                    <BiEnvelope size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Email:</Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>{teacher.email}</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Box sx={{ my: 4, height: 1, bgcolor: '#f0f1f5' }} />

                    {/* About & Education - Placeholder for now until we have fields for it */}
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465', mb: 2 }}>About</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                            {teacher.about || 'No details provided.'}
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465', mt: 4, mb: 2 }}>Education / Qualification:</Typography>
                        <Box sx={{ pl: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3d4465' }}>• {teacher.qualification}</Typography>
                        </Box>
                    </Box>

                </Box>
            </Card>
        </Box>
    );
};

export default TeacherDetails;
