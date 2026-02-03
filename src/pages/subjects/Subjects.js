import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, IconButton, InputBase, Select, MenuItem, Stack, Chip } from '@mui/material';
import Card from '../../components/common/Card';
import { BiPlus, BiPencil, BiTrash, BiSearch, BiBook, BiTime } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Subjects = () => {
    // Mock Data for Subjects
    const subjects = [
        { id: 'SUB001', name: 'Mathematics', code: 'MATH101', grade: 'Grade 10', teacher: 'John Doe', sessions: 5, color: '#4d44b5' },
        { id: 'SUB002', name: 'Physics', code: 'PHY101', grade: 'Grade 11', teacher: 'Emily Davis', sessions: 4, color: '#fb7d5b' },
        { id: 'SUB003', name: 'Chemistry', code: 'CHEM101', grade: 'Grade 11', teacher: 'Sarah Wilson', sessions: 4, color: '#30c7ec' },
        { id: 'SUB004', name: 'English Literature', code: 'ENG201', grade: 'Grade 12', teacher: 'Alice Johnson', sessions: 3, color: '#fcc43e' },
        { id: 'SUB005', name: 'Biology', code: 'BIO101', grade: 'Grade 9', teacher: 'Michael Brown', sessions: 4, color: '#369c5e' },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Subjects</Typography>
                    <Typography variant="body2" color="text.secondary">Manage curriculum subjects and assignments.</Typography>
                </Box>
                <Button variant="contained" component={Link} to="/subjects/add" startIcon={<BiPlus size={20} />} sx={{ borderRadius: '30px', px: 3 }}>
                    New Subject
                </Button>
            </Box>

            {/* Quick Stats */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
                <Card sx={{ flex: 1, display: 'flex', alignItems: 'center', p: 3, gap: 2 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: '#e1f1ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4d44b5' }}>
                        <BiBook size={24} />
                    </Box>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: '24px !important', mb: 0 }}>{subjects.length}</Typography>
                        <Typography variant="body2" color="text.secondary">Active Subjects</Typography>
                    </Box>
                </Card>
                <Card sx={{ flex: 1, display: 'flex', alignItems: 'center', p: 3, gap: 2 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: '#fff2d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fcc43e' }}>
                        <BiTime size={24} />
                    </Box>
                    <Box>
                        <Typography variant="h2" sx={{ fontSize: '24px !important', mb: 0 }}>32</Typography>
                        <Typography variant="body2" color="text.secondary">Total Sessions/Week</Typography>
                    </Box>
                </Card>
            </Stack>


            {/* Toolbar */}
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
                        placeholder="Search subjects..."
                        sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: 14 }}
                    />
                </Box>

                <Select value="all" size="small" sx={{ borderRadius: 5, minWidth: 150, bgcolor: 'background.default', border: 'none', '& fieldset': { border: 'none' }, '& .MuiSelect-select': { py: 1.5 } }}>
                    <MenuItem value="all">All Grades</MenuItem>
                    <MenuItem value="10">Grade 10</MenuItem>
                    <MenuItem value="11">Grade 11</MenuItem>
                    <MenuItem value="12">Grade 12</MenuItem>
                </Select>
            </Box>

            {/* Subjects Table */}
            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ '& th': { color: 'text.secondary', fontWeight: 600, borderBottom: '1px solid #f0f1f5', pb: 2 } }}>
                                <TableCell padding="checkbox"><Checkbox /></TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Subject Code</TableCell>
                                <TableCell>Grade</TableCell>
                                <TableCell>Teacher</TableCell>
                                <TableCell>Sessions/Week</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjects.map((sub, i) => (
                                <TableRow key={i} hover sx={{ '& td': { borderBottom: '1px solid #f0f1f5', py: 2.5 } }}>
                                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ width: 36, height: 36, bgcolor: sub.color, borderRadius: '8px', fontSize: 14 }}>{sub.name.charAt(0)}</Avatar>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3d4465' }}>{sub.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{sub.code}</TableCell>
                                    <TableCell>
                                        <Chip label={sub.grade} size="small" sx={{ bgcolor: '#f0f1f5', color: '#4d44b5', fontWeight: 600, borderRadius: 2 }} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ color: '#3d4465' }}>{sub.teacher}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{sub.sessions}</Typography>
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

export default Subjects;
