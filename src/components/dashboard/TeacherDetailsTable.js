import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Box,
    Typography,
    LinearProgress
} from '@mui/material';



const TeacherDetailsTable = ({ teachers }) => {
    return (
        <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 600 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Subject</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Qualification</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Performance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teachers.map((teacher) => (
                        <TableRow key={teacher.id} hover>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        src={`https://i.pravatar.cc/150?u=${teacher.id}`}
                                        sx={{ width: 40, height: 40, bgcolor: '#4d44b5' }}
                                    >
                                        {teacher.name.charAt(0)}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>{teacher.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>{teacher.qualification}</TableCell>
                            <TableCell sx={{ width: 200, minWidth: 200 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={teacher.performance}
                                        sx={{
                                            flexGrow: 1,
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: '#f0f0f0',
                                            '& .MuiLinearProgress-bar': {
                                                bgcolor: teacher.performance > 80 ? '#4caf50' : teacher.performance > 60 ? '#fcc43e' : '#ff5b5b',
                                                borderRadius: 4
                                            }
                                        }}
                                    />
                                    <Typography variant="caption" color="text.secondary">{teacher.performance}%</Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TeacherDetailsTable;
