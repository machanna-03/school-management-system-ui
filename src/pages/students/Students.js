import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, IconButton, InputBase, Select, MenuItem, Stack, Paper } from '@mui/material';
import Card from '../../components/common/Card';
import { BiPlus, BiSearch, BiDotsHorizontalRounded, BiPhone, BiEnvelope, BiShow, BiEdit, BiTrash } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const classNameParam = params.get('class');
        if (classNameParam) {
            setSelectedClass(classNameParam);
        }
        fetchStudents();
        fetchClasses();
    }, [location.search]);

    const fetchStudents = async () => {
        try {
            const response = await api.get('/getStudents');
            if (response.data.students) {
                setStudents(response.data.students);
            }
        } catch (error) {
            console.error("Failed to fetch students:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClasses = async () => {
        try {
            // We can get unique class names from the classes endpoint or derive from students
            // But getting from /getClasses ensures we have the valid list
            const response = await api.get('/getClasses');
            if (response.data.classes) {
                // Extract unique class names
                const uniqueClasses = [...new Set(response.data.classes.map(item => item.class_name))];
                setClasses(uniqueClasses);
            }
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.admission_number?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesClass = selectedClass ? student.class === selectedClass : true;

        return matchesSearch && matchesClass;
    });

    const handleEdit = (id) => {
        // Navigate to edit page
        window.location.href = `/students/edit/${id}`;
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await api.post('/deleteStudent', { id });
                // notifications.show({ title: 'Success', message: 'Student deleted successfully', color: 'green' });
                fetchStudents();
            } catch (error) {
                console.error("Failed to delete student:", error);
                // notifications.show({ title: 'Error', message: 'Failed to delete student', color: 'red' });
            }
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">Students</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/students/add"
                        startIcon={<BiPlus size={20} />}
                        sx={{ bgcolor: '#4d44b5', borderRadius: 5, px: 3, '&:hover': { bgcolor: '#3d34a5' } }}
                    >
                        New Student
                    </Button>
                </Box>
            </Box>

            {/* Top Bar with Search and Filter */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f0f1f5',
                        px: 2,
                        py: 1,
                        borderRadius: '30px',
                        width: { xs: '100%', sm: 300 },
                    }}
                >
                    <BiSearch style={{ fontSize: 20, color: '#a1a5b7', marginRight: 10 }} />
                    <InputBase
                        placeholder="Search by name or ID..."
                        sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: 14 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        displayEmpty
                        size="small"
                        sx={{
                            borderRadius: 5,
                            minWidth: 150,
                            bgcolor: '#f0f1f5',
                            border: 'none',
                            '& fieldset': { border: 'none' }
                        }}
                    >
                        <MenuItem value="">
                            <em style={{ fontStyle: 'normal', color: '#a1a5b7' }}>All Classes</em>
                        </MenuItem>
                        {classes.map((cls, index) => (
                            <MenuItem key={index} value={cls}>{cls}</MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Paper>

            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ '& th': { color: 'text.secondary', fontWeight: 600, borderBottom: 'none' } }}>
                                <TableCell>Name</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Parent</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>Loading...</TableCell>
                                </TableRow>
                            ) : filteredStudents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>No students found.</TableCell>
                                </TableRow>
                            ) : (
                                filteredStudents.map((std, i) => (
                                    <TableRow
                                        key={std.id}
                                        hover
                                        sx={{ '& td': { borderBottom: 'none', py: 2 } }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    sx={{ width: 45, height: 45, bgcolor: '#4d44b5', fontWeight: 700 }}
                                                >
                                                    {std.name?.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3d4465' }}>{std.name}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{std.admission_number}</TableCell>
                                        <TableCell>
                                            <Box sx={{ bgcolor: '#ff9f43', color: 'white', px: 2, py: 0.5, borderRadius: 5, fontSize: 12, fontWeight: 600, textAlign: 'center', display: 'inline-block' }}>
                                                {std.class} - {std.section}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{std.father_name}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{std.city}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton size="small" sx={{ bgcolor: '#e1f1ff', color: '#4d44b5' }}><BiPhone /></IconButton>
                                                <Typography variant="body2" sx={{ alignSelf: 'center' }}>{std.phone_number}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton
                                                    size="small"
                                                    sx={{ bgcolor: '#e1f1ff', color: '#4d44b5' }}
                                                    component={Link}
                                                    to={`/students/details/${std.id}`}
                                                    title="View"
                                                >
                                                    <BiShow />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{ bgcolor: '#fff3e0', color: '#ff9800' }}
                                                    onClick={() => handleEdit(std.id)}
                                                    title="Edit"
                                                >
                                                    <BiEdit />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{ bgcolor: '#ffebee', color: '#f44336' }}
                                                    onClick={() => handleDelete(std.id)}
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

export default Students;
