import React from 'react';
import { Box, Typography, Grid, Avatar, IconButton, Stack } from '@mui/material';
import Card from '../../components/common/Card';
import { BiDotsHorizontalRounded, BiUser, BiMap, BiPhone, BiEnvelope } from 'react-icons/bi';

const TeacherDetails = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" color="text.primary">Teacher Details</Typography>
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
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            sx={{
                                width: 150,
                                height: 150,
                                border: '5px solid white',
                                boxShadow: '0 4px 18px rgba(0,0,0,0.1)'
                            }}
                        />
                        <IconButton sx={{ mt: 9 }}>
                            <BiDotsHorizontalRounded size={30} color="#a098ae" />
                        </IconButton>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465', mb: 1 }}>Maria Historia</Typography>
                        <Typography variant="body1" sx={{ color: '#4d44b5', fontWeight: 600 }}>History Teacher</Typography>
                    </Box>

                    {/* Contact Icons Grid */}
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ bgcolor: '#ff7d5b', p: 1.5, borderRadius: '50%', color: 'white', display: 'flex' }}>
                                    <BiUser size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Parents:</Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>Justin Hope</Typography>
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
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>Jakarta, Indonesia</Typography>
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
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>+12 345 6789 0</Typography>
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
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#3d4465' }}>Historia@mail.com</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Box sx={{ my: 4, height: 1, bgcolor: '#f0f1f5' }} />

                    {/* About & Education */}
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465', mb: 2 }}>About</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465', mt: 4, mb: 2 }}>Education:</Typography>
                        <Box sx={{ pl: 2 }}>
                            <Stack spacing={3}>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3d4465' }}>• History Major, University Akademi Historia</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 2, mt: 0.5 }}>2013-2017</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3d4465' }}>• Master of History, University Akademi Historia</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 2, mt: 0.5 }}>2013-2017</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>

                </Box>
            </Card>
        </Box>
    );
};

export default TeacherDetails;
