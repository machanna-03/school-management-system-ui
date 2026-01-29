import React from 'react';
import { Box, Typography, Button, Grid, InputBase, Select, MenuItem, Stack, IconButton, Avatar, Chip } from '@mui/material';
import Card from '../../components/common/Card';
import { BiSearch, BiPlus, BiDotsHorizontalRounded, BiUser, BiEnvelope } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Teachers = () => {
    const teachers = [
        { id: 1, name: 'Dimitres Viga', role: 'Teacher', subjects: ['Mathematics', 'Science', 'Art'], img: 'DV' },
        { id: 2, name: 'Dimitres Viga', role: 'Teacher', subjects: ['Mathematics', 'Science', 'Art'], img: 'DV' },
        { id: 3, name: 'Dimitres Viga', role: 'Teacher', subjects: ['Mathematics', 'Science', 'Art'], img: 'DV' },
        { id: 4, name: 'Dimitres Viga', role: 'Teacher', subjects: ['Mathematics', 'Science', 'Art'], img: 'DV' },
        { id: 5, name: 'Dimitres Viga', role: 'Teacher', subjects: ['Mathematics', 'Science', 'Art'], img: 'DV' },
        { id: 6, name: 'Dimitres Viga', role: 'Teacher', subjects: ['Mathematics', 'Science', 'Art'], img: 'DV' },
        { id: 7, name: 'Dimitres Viga', role: 'Teacher', subjects: ['Mathematics', 'Science', 'Art'], img: 'DV' },
        { id: 8, name: 'Dimitres Viga', role: 'Teacher', subjects: ['Mathematics', 'Science', 'Art'], img: 'DV' },
    ];

    return (
        <Box>
            {/* Top Bar with Search and Filters */}
            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.default',
                        px: 2,
                        py: 1.5,
                        borderRadius: '12px',
                        width: 300,
                    }}
                >
                    <BiSearch style={{ fontSize: 24, color: '#a098ae', marginRight: 10 }} />
                    <InputBase
                        placeholder="Search here..."
                        sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: 16 }}
                    />
                </Box>

                <Stack direction="row" spacing={2}>
                    <Select value="newest" size="small" sx={{ borderRadius: 3, minWidth: 120, bgcolor: 'background.default', border: 'none', '& fieldset': { border: 'none' }, color: '#3d4465', fontWeight: 600 }}>
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/teachers/add"
                        startIcon={<BiPlus size={22} />}
                        sx={{ borderRadius: 3, textTransform: 'none', fontSize: 16, px: 3, bgcolor: '#4d44b5' }}
                    >
                        New Teacher
                    </Button>
                </Stack>
            </Box>

            <Grid container spacing={3}>
                {teachers.map((teacher, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ textAlign: 'center', p: 1, position: 'relative' }}>
                            <IconButton sx={{ position: 'absolute', top: 10, right: 10, color: '#a098ae' }}>
                                <BiDotsHorizontalRounded size={24} />
                            </IconButton>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                                <Avatar
                                    sx={{ width: 100, height: 100, fontSize: 32 }}
                                    src={`https://randomuser.me/api/portraits/med/men/${index + 20}.jpg`}
                                />
                            </Box>

                            <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465', mb: 0.5 }}>{teacher.name}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{teacher.role}</Typography>

                            <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 3 }}>
                                <Chip label="Mathematics" size="small" sx={{ bgcolor: '#e6f7e9', color: '#2ecc71', fontWeight: 600, fontSize: 10, height: 24 }} />
                                <Chip label="Science" size="small" sx={{ bgcolor: '#fff2e6', color: '#ff7e3e', fontWeight: 600, fontSize: 10, height: 24 }} />
                                <Chip label="Art" size="small" sx={{ bgcolor: '#ffeaea', color: '#ff3d57', fontWeight: 600, fontSize: 10, height: 24 }} />
                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/teachers/details`}
                                    startIcon={<BiUser />}
                                    sx={{
                                        bgcolor: '#4d44b5',
                                        borderRadius: 5,
                                        textTransform: 'none',
                                        minWidth: 100,
                                        boxShadow: 'none',
                                        '&:hover': { bgcolor: '#3d3495' }
                                    }}
                                >
                                    Profile
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<BiEnvelope />}
                                    sx={{
                                        bgcolor: '#f0f1f5',
                                        color: '#3d4465',
                                        borderRadius: 5,
                                        textTransform: 'none',
                                        minWidth: 100,
                                        boxShadow: 'none',
                                        '&:hover': { bgcolor: '#e0e1e5' }
                                    }}
                                >
                                    Chat
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Teachers;
