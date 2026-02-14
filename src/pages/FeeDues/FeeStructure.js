import React, { useState, useEffect } from "react";
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
import { BiSave, BiEdit } from "react-icons/bi";
import { apiList, invokeApi, invokeGetApi } from "../../services/ApiServices";
import { notifications } from '@mantine/notifications';

const FeeStructure = () => {
  // Form State
  const [formData, setFormData] = useState({
    student_name: "",
    roll_number: "",
    class_id: "",
    section_name: "",
    academic_year: "2025-26",
    admission_fee: "",
    tuition_fee: "",
    transport_fee: "",
    due_date: new Date(),
    status: "Active"
  });

  // Data States
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]); // Assuming fetch sections based on class
  const [feeRecords, setFeeRecords] = useState([]); // To display list below
  const [searchQuery, setSearchQuery] = useState(""); // Search State

  useEffect(() => {
    fetchClasses();
    fetchFeeRecords();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await invokeGetApi(apiList.getClassList);
      if (res && res.data && Array.isArray(res.data.classes)) {
        setClasses(res.data.classes);
      }
    } catch (e) { }
  };

  const fetchFeeRecords = async () => {
    try {
      const res = await invokeGetApi(apiList.getFeeStructures);
      // We might need to filter or adjust this based on what the API actually returns
      // For now, assuming it returns structures that we can map to the table
      if (Array.isArray(res.data)) setFeeRecords(res.data);
    } catch (e) { }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const admin = parseFloat(formData.admission_fee) || 0;
    const tuition = parseFloat(formData.tuition_fee) || 0;
    const transport = parseFloat(formData.transport_fee) || 0;
    return admin + tuition + transport;
  };

  const handleSubmit = async () => {
    // Basic validation
    // Ideally we need student_name or roll_number, and class
    if (!formData.class_id || !formData.academic_year) {
      notifications.show({ title: 'Validation', message: 'Class and Academic Year are required', color: 'orange' });
      return;
    }

    try {
      // Prepare payload
      // We send the specific fee amounts. The backend should handle creating the structure.
      const payload = {
        ...formData,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString().split('T')[0] : null,
        total_fee: calculateTotal()
      };

      const res = await invokeApi(apiList.saveStudentFeeStructure, payload); // New Endpoint we will add

      if (res.status === 200) {
        notifications.show({ title: 'Success', message: 'Fee Structure Saved', color: 'green' });
        // Reset form
        setFormData({
          student_name: "",
          roll_number: "",
          class_id: "",
          section_name: "",
          academic_year: "2025-26",
          admission_fee: "",
          tuition_fee: "",
          transport_fee: "",
          due_date: new Date(),
          status: "Active"
        });
        fetchFeeRecords();
      } else {
        notifications.show({ title: 'Error', message: res.data?.error || 'Failed to save', color: 'red' });
      }
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Failed to save fee structure', color: 'red' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Create / Edit Fee Structure
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            {/* Row 1 */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Student Name"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Student Roll Number"
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                placeholder="Enter Roll No"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Class *"
                name="class_id"
                value={formData.class_id}
                onChange={handleChange}
              >
                <MenuItem value="">Select Class</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Section *"
                name="section_name"
                value={formData.section_name}
                onChange={handleChange}
                placeholder="Section"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Academic Year *"
                name="academic_year"
                value={formData.academic_year}
                onChange={handleChange}
              >
                <MenuItem value="2024-25">2024-25</MenuItem>
                <MenuItem value="2025-26">2025-26</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Admission Fee"
                name="admission_fee"
                type="number"
                value={formData.admission_fee}
                onChange={handleChange}
              />
            </Grid>

            {/* Row 3 */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Tuition Fee"
                name="tuition_fee"
                type="number"
                value={formData.tuition_fee}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Transport Fee"
                name="transport_fee"
                type="number"
                value={formData.transport_fee}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                name="due_date"
                InputLabelProps={{ shrink: true }}
                value={formData.due_date instanceof Date ? formData.due_date.toISOString().split('T')[0] : formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
            </Grid>

            {/* Row 4 */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Grand Total"
                value={calculateTotal()}
                disabled
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                size="large"
                startIcon={<BiSave />}
                onClick={handleSubmit}
                sx={{ borderRadius: 20, px: 4, bgcolor: '#4a3aff' }}
              >
                Save Fee Structure
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Card>

      {/* List View */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={4}>
        <Typography variant="h6" fontWeight="bold">
          View Fee Structures
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            size="small"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ bgcolor: 'white' }}
          />
          <Button variant="contained" onClick={() => { }}>Search</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
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
            {feeRecords
              .filter((row) => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                const name = (row.student_name || row.structure_name || "").toLowerCase();
                return name.includes(query);
              })
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.student_name || row.structure_name || '-'}</TableCell>
                  <TableCell>{row.roll_number || '-'}</TableCell>
                  <TableCell>{row.class_name}</TableCell>
                  <TableCell>{row.section || '-'}</TableCell>
                  <TableCell>{row.academic_year}</TableCell>
                  <TableCell>{row.total_annual_fee || row.total_fee}</TableCell>
                  <TableCell>{row.status || 'Active'}</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<BiEdit />}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            {feeRecords.length === 0 && (
              <TableRow><TableCell colSpan={8} align="center">No records found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};

export default FeeStructure;
