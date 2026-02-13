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
    IconButton
} from '@mui/material';
import { BiDotsHorizontalRounded, BiPrinter } from 'react-icons/bi';



const UnpaidStudentTuitionTable = ({ students }) => {
    return (
        <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>ID No</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Class</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Fees</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Rank</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students && students.map((student) => (
                        <TableRow key={student.id} hover>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        sx={{ width: 40, height: 40, bgcolor: '#fb7d5b', fontSize: 14 }}
                                    >
                                        {student.img}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>{student.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>#{student.id}</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>{student.class}</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>{student.fees}</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>{student.rank}</TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton size="small">
                                        <BiPrinter />
                                    </IconButton>
                                    <IconButton size="small">
                                        <BiDotsHorizontalRounded />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UnpaidStudentTuitionTable;
