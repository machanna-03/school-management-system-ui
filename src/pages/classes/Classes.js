import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox, Avatar, IconButton, InputBase, Select, MenuItem, Stack, Chip, Paper } from '@mui/material';
import Card from '../../components/common/Card';
import { BiPlus, BiPencil, BiTrash, BiSearch, BiBook, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { notifications } from '@mantine/notifications';
import { apiList } from '../../services/ApiServices';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchClasses();
    }, [page, rowsPerPage]);

    const fetchClasses = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/getClasses?page=${page + 1}&limit=${rowsPerPage}`);
            if (response.data.classes) {
                setClasses(response.data.classes);
                if (response.data.pagination) {
                    setTotalCount(response.data.pagination.total_count);
                } else {
                    setTotalCount(response.data.classes.length);
                }
            }
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this class section?")) {
            try {
                await api.post(apiList.deleteClass, { id });
                notifications.show({
                    title: 'Success',
                    message: 'Class Section deleted successfully',
                    color: 'green',
                });
                fetchClasses();
            } catch (error) {
                console.error("Failed to delete class:", error);
                notifications.show({
                    title: 'Error',
                    message: 'Failed to delete class section',
                    color: 'red',
                });
            }
        }
    };

    const filteredClasses = classes.filter(cls =>
        cls.class_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.academic_year?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            {/* Header Section */}
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" color="text.primary" fontWeight="bold">Classes</Typography>
                    <Typography variant="body2" color="text.secondary">Manage your school classes and sections here.</Typography>
                </Box>
                <Button
                    variant="contained"
                    component={Link}
                    to="/classes/add"
                    startIcon={<BiPlus size={20} />}
                    sx={{ borderRadius: '30px', px: 3, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}
                >
                    New Class Section
                </Button>
            </Box>

            {/* Stats Overview */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
                <Card sx={{ flex: 1, display: 'flex', alignItems: 'center', p: 3, gap: 2 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: '#e1f1ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4d44b5' }}>
                        <BiBook size={24} />
                    </Box>
                    <Box>
                        <Typography variant="h4" sx={{ mb: 0, fontWeight: 'bold' }}>{classes.length}</Typography>
                        <Typography variant="body2" color="text.secondary">Total Sections</Typography>
                    </Box>
                </Card>
            </Stack>


            {/* Toolbar: Search */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f0f1f5',
                        px: 2,
                        py: 1,
                        borderRadius: '30px',
                        width: { xs: '100%', sm: 320 },
                    }}
                >
                    <BiSearch style={{ fontSize: 22, color: '#a1a5b7', marginRight: 10 }} />
                    <InputBase
                        placeholder="Search class by name..."
                        sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: 14 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Paper>

            {/* Classes Table */}
            <Paper sx={{ mb: 2 }}>
                <TablePagination
                    component="div"
                    count={parseInt(totalCount, 10)}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Paper>
            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                <TableCell padding="checkbox" sx={{ borderBottom: '2px solid #e0e2ff' }}><Checkbox /></TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff' }}>Class Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff' }}>Section</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff' }}>Academic Year</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff' }}>Class Teacher</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff' }}>Capacity</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>Loading...</TableCell>
                                </TableRow>
                            ) : filteredClasses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>No classes found.</TableCell>
                                </TableRow>
                            ) : (
                                filteredClasses.map((cls, i) => (
                                    <TableRow key={cls.section_id} hover sx={{ bgcolor: i % 2 === 0 ? '#fff' : '#f9f9ff', '& td': { borderBottom: '1px solid #eef0fb', py: 1.5 }, '&:hover': { bgcolor: '#f0f1ff' }, '&:last-child td': { borderBottom: 0 } }}>
                                        <TableCell padding="checkbox"><Checkbox /></TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3d4465' }}>{cls.class_name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={`Sec ${cls.section_name}`} size="small" sx={{ bgcolor: '#fff2d8', color: '#fcc43e', fontWeight: 600, borderRadius: 2 }} />
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                            {cls.academic_year}
                                        </TableCell>
                                        <TableCell>
                                            {cls.teacher_name ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Avatar sx={{ width: 30, height: 30, bgcolor: '#4d44b5', fontSize: 12 }}>{cls.teacher_name.charAt(0)}</Avatar>
                                                    <Typography variant="body2" sx={{ color: '#3d4465' }}>{cls.teacher_name}</Typography>
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">-</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={cls.capacity} size="small" variant="outlined" sx={{ color: 'text.secondary', borderColor: '#e0e0e0' }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <IconButton
                                                    size="small"
                                                    sx={{ color: '#4d44b5' }}
                                                    component={Link}
                                                    to={`/classes/edit/${cls.section_id}`}
                                                    title="Edit Class"
                                                >
                                                    <BiPencil />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{ color: '#4d44b5' }}
                                                    component={Link}
                                                    to={`/classes/assign-students/${cls.section_id}`}
                                                    title="Assign Students"
                                                >
                                                    <BiUser />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{ color: '#ff5b5b' }}
                                                    onClick={() => handleDelete(cls.section_id)}
                                                    title="Delete Class"
                                                >
                                                    <BiTrash />
                                                </IconButton>
                                            </Stack>
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

export default Classes;
