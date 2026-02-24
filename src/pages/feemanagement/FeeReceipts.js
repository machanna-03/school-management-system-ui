import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

const FeeReceipts = () => {
  const receiptRef = useRef();

  const students = [
    {
      roll: "101",
      name: "Rahul Kumar",
      class: "10",
      section: "A",
      paymentMode: "UPI",
      transactionId: "TXN123456",
      date: "11-02-2026",
      fees: [
        { head: "Tuition Fee", amount: 30000, paid: 20000 },
        { head: "Exam Fee", amount: 10000, paid: 5000 },
        { head: "Transport Fee", amount: 10000, paid: 5000 }
      ]
    },
    {
      roll: "102",
      name: "Sneha Reddy",
      class: "9",
      section: "B",
      paymentMode: "Cash",
      transactionId: "TXN789456",
      date: "11-02-2026",
      fees: [
        { head: "Tuition Fee", amount: 25000, paid: 25000 },
        { head: "Exam Fee", amount: 10000, paid: 10000 },
        { head: "Transport Fee", amount: 10000, paid: 10000 }
      ]
    }
  ];

  const [rollSearch, setRollSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [studentData, setStudentData] = useState(null);

  // Search Logic
  const handleSearch = () => {
    if (!rollSearch) {
      setFilteredStudents(students);
      return;
    }

    const result = students.filter((s) =>
      s.roll.includes(rollSearch)
    );
    setFilteredStudents(result);
  };

  // Receipt Calculations
  const calculateTotal = () =>
    studentData?.fees.reduce((sum, f) => sum + f.amount, 0);

  const calculatePaid = () =>
    studentData?.fees.reduce((sum, f) => sum + f.paid, 0);

  const calculateDue = () =>
    calculateTotal() - calculatePaid();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Fee Receipt Management
      </Typography>

      {/* 🔍 Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Search by Roll Number"
                value={rollSearch}
                onChange={(e) => setRollSearch(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                sx={{ height: "40px" }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 📋 Students Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Student List
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell align="center">View</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.roll} hover>
                    <TableCell>{student.roll}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => setStudentData(student)}
                        sx={{ textTransform: "none" }}
                      >
                        View Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No student found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 🧾 Receipt Section */}
      {studentData && (
        <>
          <Card ref={receiptRef} sx={{ p: 3, borderRadius: 3 }}>
            <CardContent>

              {/* Header */}
              <Box textAlign="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  ABC Public School
                </Typography>
                <Typography variant="body2">
                  Bengaluru, Karnataka
                </Typography>
                <Typography variant="subtitle2" mt={1}>
                  Fee Payment Receipt
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Student Info */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Roll No: {studentData.roll}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Date: {studentData.date}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Name: {studentData.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Class: {studentData.class} - {studentData.section}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Payment Mode: {studentData.paymentMode}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Transaction ID: {studentData.transactionId}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Fee Table */}
              <Typography variant="h6" mb={2}>
                Fee Details
              </Typography>

              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell>Fee Head</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Paid</TableCell>
                      <TableCell align="right">Due</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentData.fees.map((fee, index) => (
                      <TableRow key={index}>
                        <TableCell>{fee.head}</TableCell>
                        <TableCell align="right">₹ {fee.amount}</TableCell>
                        <TableCell align="right">₹ {fee.paid}</TableCell>
                        <TableCell align="right">
                          ₹ {fee.amount - fee.paid}
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Total
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        ₹ {calculateTotal()}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        ₹ {calculatePaid()}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "bold" }}>
                        ₹ {calculateDue()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ my: 3 }} />

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">
                  Receiver Signature
                </Typography>
                <Typography variant="body2">
                  School Seal
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Print Button */}
          <Stack direction="row" spacing={2} mt={3}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default FeeReceipts;
