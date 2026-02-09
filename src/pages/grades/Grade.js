import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack
} from "@mui/material";

const Grade = () => {
  const [grade, setGrade] = useState("");
  const [admissionFee, setAdmissionFee] = useState("");
  const [hallCharge, setHallCharge] = useState("");

  const [grades, setGrades] = useState([
    { id: 1, grade: "Grade 1", fee: 1000, hall: 25 },
    { id: 2, grade: "Grade 2", fee: 1000, hall: 25 },
    { id: 3, grade: "Grade 3", fee: 1000, hall: 25 },
    { id: 4, grade: "Grade 4", fee: 1777, hall: 15 }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!grade || !admissionFee || !hallCharge) return;

    setGrades([
      ...grades,
      {
        id: grades.length + 1,
        grade,
        fee: admissionFee,
        hall: hallCharge
      }
    ]);

    setGrade("");
    setAdmissionFee("");
    setHallCharge("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Grade Management
      </Typography>

      {/* Add Grade Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Add Grade
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                fullWidth
              />

              <TextField
                label="Admission Fee"
                type="number"
                value={admissionFee}
                onChange={(e) => setAdmissionFee(e.target.value)}
                fullWidth
              />

              <TextField
                label="Hall Charge (%)"
                type="number"
                value={hallCharge}
                onChange={(e) => setHallCharge(e.target.value)}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 120 }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {/* Grade Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            All Grades
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Admission Fee (₹)</TableCell>
                  <TableCell>Hall Charge (%)</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {grades.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.grade}</TableCell>
                    <TableCell>{row.fee}</TableCell>
                    <TableCell>{row.hall}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <Button size="small" variant="contained">
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ bgcolor: "#f9a825" }}
                        >
                          View & Mark
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

export default Grade;
