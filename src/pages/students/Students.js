import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, IconButton, InputBase, Select, MenuItem, Stack } from '@mui/material';
import Card from '../../components/common/Card';
import { BiPlus, BiPencil, BiTrash, BiSearch, BiDotsHorizontalRounded, BiPhone, BiEnvelope } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Students = () => {
    const students = [
        { id: '#123456789', name: 'Samantha William', class: 'VII A', date: 'March 25, 2021', parent: 'Mana William', city: 'Jakarta', phone: '+123 456 789', email: 'samantha@ex.com', img: 'SW', color: '#fb7d5b' },
        { id: '#123456789', name: 'Tony Soap', class: 'VII A', date: 'March 25, 2021', parent: 'James Soap', city: 'Jakarta', phone: '+123 456 789', email: 'tony@ex.com', img: 'TS', color: '#fcc43e' },
        { id: '#123456789', name: 'Karen Hope', class: 'VII A', date: 'March 25, 2021', parent: 'Justin Hope', city: 'Jakarta', phone: '+123 456 789', email: 'karen@ex.com', img: 'KH', color: '#30c7ec' },
        { id: '#123456789', name: 'Jordan Nico', class: 'VII A', date: 'March 25, 2021', parent: 'Amanda Nico', city: 'Jakarta', phone: '+123 456 789', email: 'jordan@ex.com', img: 'JN', color: '#fb7d5b' },
        { id: '#123456789', name: 'Nadila Adja', class: 'VII A', date: 'March 25, 2021', parent: 'Jack Adja', city: 'Jakarta', phone: '+123 456 789', email: 'nadila@ex.com', img: 'NA', color: '#4d44b5' },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h1" color="text.primary">Students</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" component={Link} to="/students/add" startIcon={<BiPlus size={20} />}>
                        New Student
                    </Button>
                </Box>
            </Box>

            {/* Top Bar with Search and Filters */}
            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 4, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.default',
                        px: 2,
                        py: 1,
                        borderRadius: '30px',
                        width: 300,
                    }}
                >
                    <BiSearch style={{ fontSize: 20, color: '#a1a5b7', marginRight: 10 }} />
                    <InputBase
                        placeholder="Search here..."
                        sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: 14 }}
                    />
                </Box>

                <Stack direction="row" spacing={2}>
                    <Select value="newest" size="small" sx={{ borderRadius: 5, minWidth: 120, bgcolor: 'background.default', border: 'none', '& fieldset': { border: 'none' } }}>
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                    <Button variant="contained" component={Link} to="/students/add" startIcon={<BiPlus size={18} />}>
                        New Student
                    </Button>
                </Stack>
            </Box>

            <Card>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ '& th': { color: 'text.secondary', fontWeight: 600, borderBottom: 'none' } }}>
                                <TableCell padding="checkbox"><Checkbox /></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Parent Name</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Grade</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((std, i) => (
                                <TableRow key={i} hover sx={{ '& td': { borderBottom: 'none', py: 2 } }}>
                                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                // src={`https://i.pravatar.cc/150?u=${i}`} // Placeholder
                                                sx={{ width: 45, height: 45, bgcolor: std.color, fontWeight: 700 }}
                                            >
                                                {/* {std.img} */}
                                                <img src={`https://randomuser.me/api/portraits/thumb/men/${i + 10}.jpg`} alt="" style={{ width: '100%', height: '100%' }} />
                                            </Avatar>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3d4465' }}>{std.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{std.id}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>{std.date}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>{std.parent}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>{std.city}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton size="small" sx={{ bgcolor: '#f0f1f5', color: '#4d44b5' }}><BiPhone /></IconButton>
                                            <IconButton size="small" sx={{ bgcolor: '#f0f1f5', color: '#4d44b5' }}><BiEnvelope /></IconButton>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ bgcolor: '#ff9f43', color: 'white', px: 2, py: 0.5, borderRadius: 5, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
                                            {std.class}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton size="small" component={Link} to="/students/details"><BiDotsHorizontalRounded /></IconButton>
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

export default Students;
