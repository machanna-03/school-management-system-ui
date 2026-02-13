import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, IconButton, InputBase, Select, MenuItem, Stack, Paper } from '@mui/material';
import Card from '../../components/common/Card';
import { BiPlus, BiSearch, BiDotsHorizontalRounded, BiPhone, BiEnvelope, BiShow, BiEdit, BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await api.get('/getTeachers');
            if (response.data.teachers) {
                setTeachers(response.data.teachers);
            }
        } catch (error) {
            console.error("Failed to fetch teachers:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this teacher?")) {
            try {
                await api.post('/deleteTeacher', { id });
                // notifications.show({ title: 'Success', message: 'Teacher deleted successfully', color: 'green' });
                fetchTeachers();
            } catch (error) {
                console.error("Failed to delete teacher:", error);
                // notifications.show({ title: 'Error', message: 'Failed to delete teacher', color: 'red' });
            }
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">Teachers</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/teachers/add"
                        startIcon={<BiPlus size={20} />}
                        sx={{ bgcolor: '#4d44b5', borderRadius: 5, px: 3, '&:hover': { bgcolor: '#3d34a5' } }}
                    >
                        New Teacher
                    </Button>
                </Box>
            </Box>

            {/* Top Bar with Search */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f0f1f5',
                        px: 2,
                        py: 1,
                        borderRadius: '30px',
                        width: 300,
                    }}
                >
                    <BiSearch style={{ fontSize: 20, color: '#a1a5b7', marginRight: 10 }} />
                    <InputBase
                        placeholder="Search by name or email..."
                        sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: 14 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>

                <Stack direction="row" spacing={2}>
                    <Select value="newest" size="small" sx={{ borderRadius: 5, minWidth: 120, bgcolor: '#f0f1f5', border: 'none', '& fieldset': { border: 'none' } }}>
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                </Stack>
            </Paper>

            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ '& th': { color: 'text.secondary', fontWeight: 600, borderBottom: 'none' } }}>
                                <TableCell padding="checkbox"><Checkbox /></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>Loading...</TableCell>
                                </TableRow>
                            ) : filteredTeachers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>No teachers found.</TableCell>
                                </TableRow>
                            ) : (
                                filteredTeachers.map((teacher, i) => (
                                    <TableRow
                                        key={teacher.id}
                                        hover
                                        sx={{ '& td': { borderBottom: 'none', py: 2 } }}
                                    >
                                        <TableCell padding="checkbox"><Checkbox /></TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    sx={{ width: 45, height: 45, bgcolor: '#4d44b5', fontWeight: 700 }}
                                                >
                                                    {teacher.name?.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3d4465' }}>{teacher.name}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{teacher.designation}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{teacher.department}</TableCell> {/* Mapping department as Class for now or logic needed */}
                                        <TableCell sx={{ color: 'text.secondary' }}>{teacher.email}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{teacher.gender}</TableCell>
                                        <TableCell>
                                            <Box sx={{ bgcolor: teacher.status === 'Active' ? '#e2fbd7' : '#ffeaea', color: teacher.status === 'Active' ? '#34c38f' : '#ff3d57', px: 2, py: 0.5, borderRadius: 5, fontSize: 12, fontWeight: 600, textAlign: 'center', display: 'inline-block' }}>
                                                {teacher.status || 'Active'}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton
                                                    size="small"
                                                    sx={{ bgcolor: '#e1f1ff', color: '#4d44b5' }}
                                                    component={Link}
                                                    to={`/teachers/details/${teacher.id}`}
                                                    title="View"
                                                >
                                                    <BiShow />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{ bgcolor: '#fff3e0', color: '#ff9800' }}
                                                    component={Link}
                                                    to={`/teachers/edit/${teacher.id}`}
                                                    title="Edit"
                                                >
                                                    <BiEdit />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{ bgcolor: '#ffebee', color: '#f44336' }}
                                                    onClick={() => handleDelete(teacher.id)}
                                                    title="Delete"
                                                >
                                                    <BiTrash />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default Teachers;
