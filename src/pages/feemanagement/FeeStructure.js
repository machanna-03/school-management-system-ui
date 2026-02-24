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
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

const FeeStructure = () => {
  const [feeData, setFeeData] = useState({
    className: "",
    section: "",
    academicYear: "",
    admissionFee: "",
    tuitionFee: "",
    examFee: "",
    transportFee: "",
    discount: "",
    lateFee: "",
    dueDate: "",
    status: "Active"
  });

  const [fees, setFees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [openAssign, setOpenAssign] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const [searchData, setSearchData] = useState({
    studentName: "",
    rollNumber: ""
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setFeeData({ ...feeData, [e.target.name]: e.target.value });
  };

  // Calculations
  const totalFee =
    Number(feeData.admissionFee || 0) +
    Number(feeData.tuitionFee || 0) +
    Number(feeData.examFee || 0) +
    Number(feeData.transportFee || 0);

  const grandTotal =
    totalFee -
    Number(feeData.discount || 0) +
    Number(feeData.lateFee || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFee = {
      id: editId || fees.length + 1,
      ...feeData,
      totalFee,
      grandTotal
    };

    if (editId) {
      setFees(fees.map((item) => (item.id === editId ? newFee : item)));
    } else {
      setFees([...fees, newFee]);
    }

    setFeeData({
      studentName: "",
      studentRollNumber: "",
      className: "",
      section: "",
      academicYear: "",
      admissionFee: "",
      tuitionFee: "",
      examFee: "",
      transportFee: "",
      discount: "",
      lateFee: "",
      dueDate: "",
      status: "Active"
    });

    setEditId(null);
  };
  const handleEdit = (row) => {
    setFeeData({
      studentName: row.studentName,
      studentRollNumber: row.studentRollNumber,
      className: row.className,
      section: row.section,
      academicYear: row.academicYear,
      admissionFee: row.admissionFee,
      tuitionFee: row.tuitionFee,
      examFee: row.examFee,
      transportFee: row.transportFee,
      discount: row.discount,
      lateFee: row.lateFee,
      dueDate: row.dueDate,
      status: row.status
    });

    setEditId(row.id);
  };
  const handleDelete = (id) => {
    setFees(fees.filter((item) => item.id !== id));
  };
  const handleSearch = () => {
    // Example mock student result
    setStudents([
      {
        id: 1,
        name: "Rahul Sharma",
        rollNumber: "101",
        className: selectedFee.className,
        section: selectedFee.section
      }
    ]);
  };
  const [formData, setFormData] = useState({
    studentName: ""
  });


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Fee Structure Management
      </Typography>

      {/* ================= CREATE / EDIT ================= */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Create / Edit Fee Structure
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Student Name"
                  name="studentName"
                  value={feeData.studentName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Student Roll Number"
                  name="studentRollNumber"
                  value={feeData.studentRollNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Class"
                  name="className"
                  value={feeData.className}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Class 5">Class 5</MenuItem>
                  <MenuItem value="Class 6">Class 6</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Section"
                  name="section"
                  value={feeData.section}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Academic Year"
                  name="academicYear"
                  value={feeData.academicYear}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="2025-26">2025 - 26</MenuItem>
                  <MenuItem value="2026-27">2026 - 27</MenuItem>
                </TextField>
              </Grid>


              {/* Fee Fields */}
              <Grid item xs={12} sm={4}>
                <TextField fullWidth size="small" label="Admission Fee" name="admissionFee" type="number" value={feeData.admissionFee} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth size="small" label="Tuition Fee" name="tuitionFee" type="number" value={feeData.tuitionFee} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth size="small" label="Transport Fee" name="transportFee" type="number" value={feeData.transportFee} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="Due Date"
                  name="dueDate"
                  InputLabelProps={{ shrink: true }}
                  value={feeData.dueDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Status"
                  name="status"
                  value={feeData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Grand Total"
                  value={grandTotal}
                  disabled
                />
              </Grid>

              <Grid item xs={12} textAlign="right">
                <Button variant="contained" type="submit">
                  {editId ? "Update Fee Structure" : "Save Fee Structure"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* ================= VIEW TABLE ================= */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            View Fee Structures
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Academic Year</TableCell>
                  <TableCell>Grand Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fees.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.studentName}</TableCell>
                    <TableCell>{row.studentRollNumber}</TableCell>
                    <TableCell>{row.className}</TableCell>
                    <TableCell>{row.section}</TableCell>
                    <TableCell>{row.academicYear}</TableCell>
                    <TableCell>₹ {row.grandTotal}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell flexDirection="row" gap={1}>
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: "none" }}
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          sx={{ textTransform: "none" }}
                          onClick={() => handleDelete(row)}
                        >
                          Delete
                        </Button>
                      </Stack>

                    </TableCell>
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

export default FeeStructure;
