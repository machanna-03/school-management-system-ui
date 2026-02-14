import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const StudentMarksHistory = () => {
  const [filters, setFilters] = useState({
    exam: "",
    className: "",
    search: ""
  });

  const marksData = [
    {
      id: 1,
      exam: "Mid Term",
      className: "Class 5",
      studentName: "Aarav Kumar",
      rollNo: "12",
      subject: "Maths",
      marks: 85
    },
    {
      id: 2,
      exam: "Mid Term",
      className: "Class 5",
      studentName: "Aarav Kumar",
      rollNo: "12",
      subject: "Science",
      marks: 78
    },
    {
      id: 3,
      exam: "Final Exam",
      className: "Class 6",
      studentName: "Ananya Reddy",
      rollNo: "5",
      subject: "Maths",
      marks: 92
    }
  ];

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredData = marksData.filter((row) => {
    return (
      (filters.exam === "" || row.exam === filters.exam) &&
      (filters.className === "" || row.className === filters.className) &&
      (filters.search === "" ||
        row.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.rollNo.includes(filters.search))
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Student Marks History
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Filter Marks
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                select
                label="Exam"
                name="exam"
                value={filters.exam}
                onChange={handleChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Mid Term">Mid Term</MenuItem>
                <MenuItem value="Final Exam">Final Exam</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                select
                label="Class"
                name="className"
                value={filters.className}
                onChange={handleChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Class 5">Class 5</MenuItem>
                <MenuItem value="Class 6">Class 6</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Search Student / Roll No"
                name="search"
                value={filters.search}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Marks Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Marks History
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Exam</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Marks</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.exam}</TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell>{row.studentName}</TableCell>
                      <TableCell>{row.rollNo}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.marks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentMarksHistory;