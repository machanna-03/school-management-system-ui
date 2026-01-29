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

const teachers = [
    { id: 1, name: 'Hanu', subject: 'Programming', qualification: 'B.Tech', performance: 80 },
    { id: 2, name: 'Sarah', subject: 'English', qualification: 'M.A.', performance: 95 },
    { id: 3, name: 'Mike', subject: 'Mathematics', qualification: 'M.Sc.', performance: 70 },
    { id: 4, name: 'Emma', subject: 'Science', qualification: 'B.Sc.', performance: 85 },
    { id: 5, name: 'John', subject: 'History', qualification: 'B.Ed.', performance: 60 },
];

const TeacherDetailsTable = () => {
    return (
        <TableContainer>
            <Table>
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
                                    <Typography variant="body2" fontWeight={600}>{teacher.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>{teacher.qualification}</TableCell>
                            <TableCell sx={{ width: 200 }}>
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
