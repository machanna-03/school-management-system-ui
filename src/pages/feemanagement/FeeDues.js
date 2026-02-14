import React, { useState } from "react";
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FeeDues = () => {
    const [searchName, setSearchName] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [openPayment, setOpenPayment] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [students, setStudents] = useState([
        {
            id: 1,
            roll: "101",
            name: "Rahul Kumar",
            class: "10",
            total: 50000,
            paid: 30000,
            dueDate: "2026-03-15"
        },
        {
            id: 2,
            roll: "102",
            name: "Sneha Reddy",
            class: "9",
            total: 45000,
            paid: 45000,
            dueDate: "2026-03-10"
        },
        {
            id: 3,
            roll: "103",
            name: "Arjun Sharma",
            class: "10",
            total: 60000,
            paid: 20000,
            dueDate: "2026-02-01"
        }
    ]);

    const today = new Date();
    const navigate = useNavigate();
    const getStatus = (student) => {
        const due = student.total - student.paid;
        const dueDate = new Date(student.dueDate);

        if (due === 0) return "Paid";
        if (due > 0 && dueDate < today) return "Overdue";
        if (student.paid > 0) return "Partial";
        return "Pending";
    };

    const getChipColor = (status) => {
        switch (status) {
            case "Paid":
                return "success";
            case "Partial":
                return "warning";
            case "Overdue":
                return "error";
            default:
                return "info";
        }
    };
    const getChipStyle = (status) => {
        switch (status) {
            case "Paid":
                return {
                    backgroundColor: "#e6f4ea",
                    color: "#2e7d32"
                };
            case "Partial":
                return {
                    backgroundColor: "#fff4e5",
                    color: "#ed6c02"
                };
            case "Overdue":
                return {
                    backgroundColor: "#fdecea",
                    color: "#d32f2f"
                };
            default:
                return {
                    backgroundColor: "#e3f2fd",
                    color: "#1565c0"
                };
        }
    };


    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase()) &&
        (selectedClass ? student.class === selectedClass : true)
    );

    const totalDueAmount = students.reduce(
        (sum, s) => sum + (s.total - s.paid),
        0
    );

    const pendingCount = students.filter(
        (s) => s.total - s.paid > 0
    ).length;

    const handlePayNow = (student) => {
        setSelectedStudent(student);
        setOpenPayment(true);
    };

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Fee Dues Management
            </Typography>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Search Student"
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
                                <MenuItem value="9">Class 9</MenuItem>
                                <MenuItem value="10">Class 10</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ height: "40px" }}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography>Total Due Amount</Typography>
                            <Typography variant="h6">
                                ₹ {totalDueAmount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography>Students with Dues</Typography>
                            <Typography variant="h6">
                                {pendingCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Table */}
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                                    <TableCell sx={{ fontWeight: 600 }}>Roll No</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="right">Total</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="right">Paid</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="right">Due</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="center">Status</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredStudents.map((row) => {
                                    const due = row.total - row.paid;
                                    const status = getStatus(row);

                                    return (
                                        <TableRow
                                            key={row.id}
                                            hover
                                            sx={{
                                                "& td": {
                                                    py: 1.5,
                                                    whiteSpace: "nowrap"
                                                }
                                            }}
                                        >
                                            <TableCell>{row.roll}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.class}</TableCell>

                                            <TableCell align="right">₹ {row.total}</TableCell>
                                            <TableCell align="right">₹ {row.paid}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 500 }}>
                                                ₹ {due}
                                            </TableCell>

                                            <TableCell>{row.dueDate}</TableCell>

                                            <TableCell align="center">
                                                <Chip
                                                    label={status}
                                                    size="small"
                                                    sx={{
                                                        ...getChipStyle(status),
                                                        fontWeight: 600,
                                                        borderRadius: "20px",
                                                        px: 1.5,
                                                        height: 26,
                                                        fontSize: "12px"
                                                    }}
                                                />

                                            </TableCell>

                                            <TableCell align="center">
                                                {due > 0 && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        onClick={() => handlePayNow(row)}
                                                        sx={{
                                                            minWidth: 120,
                                                            px: 2,
                                                            borderRadius: 2,
                                                            textTransform: "none",
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        Pay Now
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            {/* Payment Dialog */}
            <Dialog
                open={openPayment}
                onClose={() => setOpenPayment(false)}
                fullWidth
            >
                <DialogTitle>Pay Fee</DialogTitle>
                <DialogContent>
                    {selectedStudent && (
                        <Stack spacing={2} mt={1}>
                            <Typography>
                                Student: {selectedStudent.name}
                            </Typography>
                            <Typography>
                                Due Amount: ₹{" "}
                                {selectedStudent.total - selectedStudent.paid}
                            </Typography>

                            <TextField
                                size="small"
                                label="Enter Amount"
                                type="number"
                                fullWidth
                            />
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenPayment(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpenPayment(false);

                            navigate("/payment-method", {
                                state: {
                                    student: selectedStudent
                                }
                            });
                        }}
                    >
                        Submit Payment
                    </Button>

                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FeeDues;
