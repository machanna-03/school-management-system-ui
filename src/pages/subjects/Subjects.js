import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox, Avatar, IconButton, InputBase, Select, MenuItem, Stack, Chip, Paper } from '@mui/material';
import Card from '../../components/common/Card';
import { BiPlus, BiPencil, BiTrash, BiSearch, BiBook, BiTime } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchSubjects();
    }, [page, rowsPerPage]);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/getSubjects?page=${page + 1}&limit=${rowsPerPage}`);
            if (response.data.subjects) {
                setSubjects(response.data.subjects);
                if (response.data.pagination) {
                    setTotalCount(response.data.pagination.total_count);
                } else {
                    setTotalCount(response.data.subjects.length);
                }
            }
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
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
        if (window.confirm("Are you sure you want to delete this subject?")) {
            try {
                await api.post('/deleteSubject', { id });
                fetchSubjects();
            } catch (error) {
                console.error("Failed to delete subject:", error);
                alert("Failed to delete subject. It might be assigned to a class.");
            }
        }
    };

    const filteredSubjects = subjects.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const colors = ['#4d44b5', '#fb7d5b', '#30c7ec', '#fcc43e', '#369c5e'];

    return (
        <Box>
            {/* Header Section */}
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Subjects</Typography>
                    <Typography variant="body2" color="text.secondary">Manage curriculum subjects global catalog.</Typography>
                </Box>
                <Button variant="contained" component={Link} to="/subjects/add" startIcon={<BiPlus size={20} />} sx={{ borderRadius: '30px', px: 3 }}>
                    New Subject
                </Button>
            </Box>

            {/* Quick Stats - Dynamic */}
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Box>

            {/* Subjects Table */}
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
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Subject Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Subject Code</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Type</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>Loading...</TableCell>
                                </TableRow>
                            ) : filteredSubjects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>No subjects found.</TableCell>
                                </TableRow>
                            ) : (
                                filteredSubjects.map((sub, i) => (
                                    <TableRow
                                        key={sub.id}
                                        hover
                                        sx={{
                                            bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                            '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                            '&:hover': { bgcolor: '#f0f1ff !important' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell padding="checkbox"><Checkbox /></TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ width: 36, height: 36, bgcolor: colors[i % colors.length], borderRadius: '8px', fontSize: 14 }}>{sub.name.charAt(0)}</Avatar>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3d4465' }}>{sub.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{sub.code}</TableCell>
                                        <TableCell>
                                            <Chip label={sub.type || 'Theory'} size="small" sx={{ bgcolor: '#f0f1f5', color: '#4d44b5', fontWeight: 600, borderRadius: 2 }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <IconButton
                                                    size="small"
                                                    sx={{ color: '#4d44b5' }}
                                                    component={Link}
                                                    to={`/subjects/edit/${sub.id}`}
                                                >
                                                    <BiPencil />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{ color: '#ff5b5b' }}
                                                    onClick={() => handleDelete(sub.id)}
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

export default Subjects;
