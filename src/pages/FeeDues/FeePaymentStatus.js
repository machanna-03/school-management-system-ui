import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Stack,
    CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { apiList } from "../../services/ApiServices";
import { notifications } from '@mantine/notifications';

const FeePaymentStatus = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [selectedClass, setSelectedClass] = useState("");

    // Classes for filter - in a real app, fetch from API
    const classesList = ["9", "10", "11", "12"];

    const navigate = useNavigate();

    const fetchDues = async () => {
        setLoading(true);
        try {
            const response = await api.get(apiList.getFeeStructures); // Use getFeeStructures as requested
            if (Array.isArray(response.data)) {
                // Show all fee details, even if not linked to student (to handle orphan structures)
                setStudents(response.data);
            } else {
                setStudents([]);
                console.error("Fee Payment API returned non-array:", response.data);
            }
        } catch (error) {
            console.error("Error fetching fee payment status:", error);
            notifications.show({
                title: 'Error',
                message: 'Failed to fetch fee payment status',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDues();
    }, []);

    const getStatus = (student) => {
        const total = parseFloat(student.assignment_total_fee || student.total_annual_fee || 0);
        const paid = parseFloat(student.paid_amount || 0);
        const due = total - paid;

        if (due <= 0 && total > 0) return "Paid";
        if (paid > 0 && due > 0) return "Partial";
        if (paid === 0 && total > 0) return "Pending";
        return "Pending";
    };

    const getChipColor = (status) => {
        switch (status) {
            case "Paid": return "success";
            case "Partial": return "warning";
            case "Pending": return "error";
            default: return "info";
        }
    };

    const filteredStudents = students.filter((student) =>
        (student.student_name?.toLowerCase().includes(searchName.toLowerCase()) ||
            student.roll_number?.toLowerCase().includes(searchName.toLowerCase()) ||
            student.structure_name?.toLowerCase().includes(searchName.toLowerCase())) && // Include structure_name fallback
        (selectedClass ? student.class_name === selectedClass : true)
    );

    const totalDueAmount = students.reduce(
        (sum, s) => sum + (parseFloat(s.assignment_total_fee || s.total_annual_fee || 0) - parseFloat(s.paid_amount || 0)),
        0
    );

    const pendingCount = students.filter(
        (s) => (parseFloat(s.assignment_total_fee || s.total_annual_fee || 0) - parseFloat(s.paid_amount || 0)) > 0
    ).length;

    const handlePayNow = (student) => {
        navigate("/fees/collect", { state: { student } });
    };

    if (loading) {
        return (
            <Box p={3} display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Fee Payment Status
            </Typography>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Search Student / Roll No"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Select Class"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {classesList.map((cls) => (
                                    <MenuItem key={cls} value={cls}>Class {cls}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Total Due Amount</Typography>
                            <Typography variant="h4" color="error">
                                ₹ {totalDueAmount.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Students with Dues</Typography>
                            <Typography variant="h4">
                                {pendingCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell>Roll No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell align="right">Total Fee</TableCell>
                            <TableCell align="right">Paid</TableCell>
                            <TableCell align="right">Due</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((row) => {
                                const total = parseFloat(row.assignment_total_fee || row.total_annual_fee || 0);
                                const paid = parseFloat(row.paid_amount || 0);
                                const due = total - paid;
                                const status = getStatus(row);

                                return (
                                    <TableRow key={row.structure_id} hover>
                                        <TableCell>{row.roll_number || '-'}</TableCell>
                                        <TableCell>{row.student_name || row.structure_name}</TableCell>
                                        <TableCell>{row.class_name}</TableCell>
                                        <TableCell align="right">₹ {total.toLocaleString()}</TableCell>
                                        <TableCell align="right">₹ {paid.toLocaleString()}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: due > 0 ? 'error.main' : 'success.main' }}>
                                            ₹ {due.toLocaleString()}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={status}
                                                color={getChipColor(status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {due > 0 && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => handlePayNow(row)}
                                                >
                                                    Collect Fee
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    No students found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FeePaymentStatus;
