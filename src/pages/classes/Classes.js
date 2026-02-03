import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, IconButton, InputBase, Select, MenuItem, Stack, Chip } from '@mui/material';
import Card from '../../components/common/Card';
import { BiPlus, BiPencil, BiTrash, BiSearch, BiDotsHorizontalRounded, BiBook, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Classes = () => {
    // Mock Data for Classes
    const classes = [
        { id: 'C001', name: 'Mathematics 101', grade: 'Grade 10', section: 'A', teacher: 'John Doe', students: 30, subject: 'Math', color: '#4d44b5' },
        { id: 'C002', name: 'Science 101', grade: 'Grade 9', section: 'B', teacher: 'Jane Smith', students: 28, subject: 'Science', color: '#fb7d5b' },
        { id: 'C003', name: 'English Lit', grade: 'Grade 11', section: 'A', teacher: 'Alice Johnson', students: 32, subject: 'English', color: '#30c7ec' },
        { id: 'C004', name: 'History 202', grade: 'Grade 10', section: 'C', teacher: 'Robert Brown', students: 25, subject: 'History', color: '#fcc43e' },
        { id: 'C005', name: 'Physics 301', grade: 'Grade 12', section: 'A', teacher: 'Emily Davis', students: 20, subject: 'Physics', color: '#369c5e' },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Classes</Typography>
                    <Typography variant="body2" color="text.secondary">Manage your school classes and sections here.</Typography>
                </Box>
                <Button variant="contained" component={Link} to="/classes/add" startIcon={<BiPlus size={20} />} sx={{ borderRadius: '30px', px: 3 }}>
                    New Class
                </Button>
            </Box>

            {/* Stats Overview (Optional Advanced Touch) */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
                <Card sx={{ flex: 1, display: 'flex', alignItems: 'center', p: 3, gap: 2 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: '#e1f1ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4d44b5' }}>
                        <BiBook size={24} />
                    </Box>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: '24px !important', mb: 0 }}>{classes.length}</Typography>
                        <Typography variant="body2" color="text.secondary">Total Classes</Typography>
                    </Box>
                </Card>
                <Card sx={{ flex: 1, display: 'flex', alignItems: 'center', p: 3, gap: 2 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: '#fff2d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcc43e' }}>
                        <BiUser size={24} />
                    </Box>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: '24px !important', mb: 0 }}>135</Typography>
                        <Typography variant="body2" color="text.secondary">Total Students</Typography>
                    </Box>
                </Card>
            </Stack>


            {/* Toolbar: Search and Filter */}
            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 4, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, boxShadow: '0px 10px 40px 0px rgba(50, 50, 50, 0.08)' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.default',
                        px: 2,
                        py: 1.5,
                        borderRadius: '30px',
                        width: { xs: '100%', sm: 320 },
                    }}
                >
                    <BiSearch style={{ fontSize: 22, color: '#a1a5b7', marginRight: 10 }} />
                    <InputBase
                        placeholder="Search class by name, grade..."
                        sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: 14 }}
                    />
                </Box>

                <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                    <Select value="latest" size="small" sx={{ borderRadius: 5, minWidth: 140, bgcolor: 'background.default', border: 'none', '& fieldset': { border: 'none' }, '& .MuiSelect-select': { py: 1.5 } }}>
                        <MenuItem value="latest">Latest Added</MenuItem>
                        <MenuItem value="oldest">Oldest Added</MenuItem>
                        <MenuItem value="name">Name (A-Z)</MenuItem>
                    </Select>
                </Stack>
            </Box>

            {/* Classes Table */}
            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ '& th': { color: 'text.secondary', fontWeight: 600, borderBottom: '1px solid #f0f1f5', pb: 2 } }}>
                                <TableCell padding="checkbox"><Checkbox /></TableCell>
                                <TableCell>Class ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Grade & Section</TableCell>
                                <TableCell>Teacher</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Students</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classes.map((cls, i) => (
                                <TableRow key={i} hover sx={{ '& td': { borderBottom: '1px solid #f0f1f5', py: 2.5 } }}>
                                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                                    <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{cls.id}</TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3d4465' }}>{cls.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Chip label={cls.grade} size="small" sx={{ bgcolor: '#f0f1f5', color: '#4d44b5', fontWeight: 600, borderRadius: 2 }} />
                                            <Chip label={`Sec: ${cls.section}`} size="small" sx={{ bgcolor: '#fff2d8', color: '#fcc43e', fontWeight: 600, borderRadius: 2 }} />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar sx={{ width: 30, height: 30, bgcolor: cls.color, fontSize: 12 }}>{cls.teacher.charAt(0)}</Avatar>
                                            <Typography variant="body2" sx={{ color: '#3d4465' }}>{cls.teacher}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>{cls.subject}</TableCell>
                                    <TableCell>
                                        <Chip label={`${cls.students} Students`} size="small" variant="outlined" sx={{ color: 'text.secondary', borderColor: '#e0e0e0' }} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <IconButton size="small" sx={{ color: '#4d44b5' }}><BiPencil /></IconButton>
                                            <IconButton size="small" sx={{ color: '#ff5b5b' }}><BiTrash /></IconButton>
                                        </Stack>
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

export default Classes;
