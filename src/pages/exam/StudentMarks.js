import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const StudentMarks = () => {
  const [formData, setFormData] = useState({
    exam: "",
    className: "",
    studentName: "",
    rollNo: "",
    marks: ""
  });

  const [marksList, setMarksList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.exam ||
      !formData.className ||
      !formData.studentName ||
      !formData.rollNo ||
      !formData.marks
    ) {
      return;
    }

    setMarksList([
      ...marksList,
      { id: marksList.length + 1, ...formData }
    ]);

    setFormData({
      exam: "",
      className: "",
      studentName: "",
      rollNo: "",
      marks: ""
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Student Exam Marks
      </Typography>

      {/* Add Marks Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={3}>
            Add Student Marks
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Exam"
                  name="exam"
                  value={formData.exam}
                  onChange={handleChange}
                >
                  <MenuItem value="Mid Term">Mid Term</MenuItem>
                  <MenuItem value="Final Exam">Final Exam</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Class"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                >
                  <MenuItem value="Class 5">Class 5</MenuItem>
                  <MenuItem value="Class 6">Class 6</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                 fullWidth
                 size="small"
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                 fullWidth
                  size="small"
                  label="Roll No"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                 fullWidth
                  size="small"
                  type="number"
                  label="Marks"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} textAlign="right">
                <Button type="submit" variant="contained">
                  Submit Marks
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Marks Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Student Marks List
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
                  <TableCell>Marks</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {marksList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.exam}</TableCell>
                    <TableCell>{row.className}</TableCell>
                    <TableCell>{row.studentName}</TableCell>
                    <TableCell>{row.rollNo}</TableCell>
                    <TableCell>{row.marks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentMarks;
