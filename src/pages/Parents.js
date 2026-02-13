import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, IconButton, InputBase, Select, MenuItem, Stack, Paper } from '@mui/material';
import Card from '../components/common/Card';
import { BiPlus, BiSearch, BiDotsHorizontalRounded, BiPhone, BiEnvelope, BiEdit, BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Parents = () => {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchParents();
    }, []);

    const fetchParents = async () => {
        try {
            const response = await api.get('/getParents');
            if (response.data.parents) {
                setParents(response.data.parents);
            }
        } catch (error) {
            console.error("Failed to fetch parents:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredParents = parents.filter(parent =>
        parent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this parent?")) {
            try {
                await api.post('/deleteParent', { id });
                fetchParents();
            } catch (error) {
                console.error("Failed to delete parent:", error);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">Parents</Typography>
                {/* <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        variant="contained" 
                        component={Link} 
                        to="/parents/add" 
                        startIcon={<BiPlus size={20} />}
                        sx={{ bgcolor: '#4d44b5', borderRadius: 5, px: 3, '&:hover': { bgcolor: '#3d34a5' } }}
                    >
                        New Parent
                    </Button>
                </Box> */}
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
            </Paper>

            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ '& th': { color: 'text.secondary', fontWeight: 600, borderBottom: 'none' } }}>
                                <TableCell padding="checkbox"><Checkbox /></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Occupation</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>Loading...</TableCell>
                                </TableRow>
                            ) : filteredParents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>No parents found.</TableCell>
                                </TableRow>
                            ) : (
                                filteredParents.map((parent, i) => (
                                    <TableRow key={parent.id} hover sx={{ '& td': { borderBottom: 'none', py: 2 } }}>
                                        <TableCell padding="checkbox"><Checkbox /></TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    sx={{ width: 45, height: 45, bgcolor: '#ff9f43', fontWeight: 700 }}
                                                >
                                                    {parent.name?.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3d4465' }}>{parent.name}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{parent.email}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{parent.phone_number}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{parent.occupation}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{parent.city}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton
                                                    size="small"
                                                    sx={{ bgcolor: '#fff3e0', color: '#ff9800' }}
                                                    component={Link}
                                                    to={`/parents/edit/${parent.id}`}
                                                    title="Edit"
                                                >
                                                    <BiEdit />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{ bgcolor: '#ffebee', color: '#f44336' }}
                                                    onClick={() => handleDelete(parent.id)}
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

export default Parents;
